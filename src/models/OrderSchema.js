const mongoose = require('mongoose')

const orderSummarySchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    items :[
        {
            product : {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'product'
            },
            quantity : Number,
            price : Number
        }
    ],
    totalAmount : {
        type : Number,
        required : true
    }
}, {timestamps:true})

const Order = mongoose.model('Order', orderSummarySchema)

module.exports = {
    Order
}