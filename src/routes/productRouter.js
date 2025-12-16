const express = require('express')
const { Product } = require('../models/productSchema')
const router = express.Router()

router.post('/addProduct',async (req,res)=>{
    try {
        const { name , price, desc, quantity, image, category } = req.body

        if(!name || !price || !desc || !quantity || !image || !category){
            throw new Error('Missing Informations')
        }

        let obj = {name , price, desc, quantity, image, category}

        const createdProduct = await Product.create(obj)


        res.status(201).json({msg : "done", data : createdProduct})
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})


router.get('/product/:id',async (req,res)=>{
    try {
        const { id } = req.params

        const foundProduct = await Product.findById(id)

        if(!foundProduct){
            throw new Error('Product not found!')
        }
        res.json(foundProduct)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})

router.delete('/product/:id', async (req,res)=>{
    try {
        const { id } = req.params
        const filteredProducts = await Product.findByIdAndDelete(id)

        res.json(filteredProducts)
        
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})

router.patch('/product/edit/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const { name , price, desc, quantity, image, category  } = req.body
        const foundProduct = await Product.findById(id)
        if(!foundProduct){
            throw new Error('Product Not Found!')
        }

        if(quantity<1){
            throw new Error('Please enter a valid quantity...')
        }

        if(price<=0){
            throw new Error('Please enter a valid amount...')
        }


        const updatedProduct = await Product.findByIdAndUpdate(id ,{name , price, desc, quantity, image, category })
        res.status(200).json({Success : true , updatedProduct}  )
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})



module.exports = {
    productRouter : router
}