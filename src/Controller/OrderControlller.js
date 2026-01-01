
const { Order } = require("../models/OrderSchema")
const { User } = require("../models/userSchema")


const checkout = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id)
                    .populate("cart.product")

                    
        const userCart = user.cart

        if(userCart.length == 0){
            throw new Error('Cart is Empty!')
        }

        let totalAmount = 0
        let orderedProduct = []

        for(let item of userCart){
            totalAmount += item.product.price * item.quantity

            orderedProduct.push({
                product : item.product._id,
                quantity : item.quantity,
                price : item.product.price
            })
        }


        const order = await Order.create({
            user : user._id,
            items : orderedProduct,
            totalAmount
        })

        user.cart = [] //cleared cart after order
        await user.save()

        res.status(200).json({
            msg:'done', order
        })

    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


const getMyOrders = async(req,res)=>{
    try {
        
        const orders = await Order.findById(req.user._id)
        res.status(200).json({msg:'done', orders})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    checkout
}