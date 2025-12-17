const jwt = require('jsonwebtoken')
const { User } = require('../models/userSchema')

const isLoggedIn = async (req,res,next)=>{
    try {
        const { loginToken } = req.cookies

        const originalObj = jwt.verify(loginToken,process.env.JWT_SECRET)
        // console.log(originalObj)

        const foundUser = await User.findOne({_id:originalObj.id})

        if(!foundUser){
            throw new Error('User Not Found!')
        }
        // console.log(foundUser)
        req.user = foundUser
        next()

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    isLoggedIn
}