const { Product } = require('../models/productSchema');
const { User } = require('../models/userSchema');

const addToCart = async (req, res) => {
    try {
        const { quantity } = req.body
        const { id } = req.params

        if(quantity<=0){2
            throw new Error('Quantity must be greater than 0')
        }

        const foundProduct = await Product.findById(id)
        if(!foundProduct){
            throw new Error('Product not found!')
        }

        const user = await User.findById(req.user._id)

        const prevCart = user.cart
        let isProductInCart = false

        //updating cart if present
        for(let item of prevCart){
            if(item.product.toString() === id.toString()){
                item.quantity = quantity``
                isProductInCart = true
                break
            }
        }


        //if not present in cart 
        if(!isProductInCart){
            prevCart.push({
                product : id,
                quantity
            })
        }
        await user.save()

        res.status(201).json({msg:"Updated Cart", cart: user.cart})

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const viewCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteFromCart = async(req,res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(req.user._id)

        //checking if it is present in cart

        const newCart = user.cart.filter((item)=>{
            return item.product.toString() !== id.toString()
        })

        user.cart = newCart
        await user.save()

        res.status(200).json({msg : 'Product Removed From Cart', newCart})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const cartSummary = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate('cart.product')

        let totalSum = 0
        let totalProduct = 0

        for(let item of user.cart){
            totalProduct += item.quantity
            totalSum += item.product.price * item.quantity
        }

        res.status(200).json({totalProduct, totalSum, cart : user.cart})
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const clearCart = async(req,res)=>{
    const user = await User.findById(req.user._id)
    user.cart = []
    await user.save()
    res.status(200).json({msg:'cart cleared successfully!'})
}



module.exports = {
    addToCart, viewCart, deleteFromCart, cartSummary, clearCart
}