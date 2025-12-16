const express = require('express')
const { User } = require('../models/userSchema')
const router = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')


router.post('/signup',async (req,res)=>{
    try {
        const {firstName, lastName, username, password, role, phoneNumber } = req.body

        if(!firstName || !username || !password || !role || !phoneNumber ){
            throw new Error("Please fill all the details...")
        }
        const foundUser = await User.findOne({username})

        if(foundUser){
            throw new Error('User Already Exists!')
        }

  
    const isStrongPassword = validator.isStrongPassword(password)
    if(!isStrongPassword){
        throw new Error('Please use a strong password!')
    }


    const isPhoneNumber = validator.isMobilePhone(phoneNumber)
    if(!isPhoneNumber){
        throw new Error('Please use a correct phone number!')
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const createdUser = await User.create({firstName, lastName, username, password : hashedPassword , role, phoneNumber})
    res.status(201).json({Status:true,createdUser})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/login',async(req,res)=>{
    try {
        const { username, password } = req.body

    if(!username || !password){
        throw new Error('Please fill both details')
    }

    const foundUser = await User.findOne({username})

    if(!foundUser){
        throw new Error('User not found!')
    }
    const {firstName, lastName, role, phoneNumber} = foundUser

    const isValidUser = await bcrypt.compare(password,foundUser.password)

    if(!isValidUser){
        throw new Error("Incorrect Password!")
    }

    const token = jwt.sign({id : foundUser._id},process.env.JWT_SECRET)
    res.cookie('loginToken',token, { maxAge : 24*60*60*1000}).status(200).json({msg : "User Logged In" , data : {firstName, lastName, username, role, phoneNumber}})


    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.post('/logout',(req,res)=>{
    try {
        res.cookie('loginToken',null).status(200).json({msg: "User Logged out"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



module.exports = {
    userRouter : router
}