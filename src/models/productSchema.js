const mongoose = require('mongoose')
const validate = require('validator')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 20,
        trim : true
    },
    price : {
        type : Number,
        required : true,
    },
    desc : {
        type : String,
        minLength : 10,
        maxLength : 50,
        trim: true
    },
    quantity : {
        type : Number,
        required : true,
    },

    image : {
        type : String,
        validate : (val)=>{
            const isValidURL = validate.isURL(val)
            if(!isValidURL){
                throw new Error("Not A Valid URL")
            }
        }
    },

    category : {
        type : String,
        enum : ['Electronics', 'Grocery', 'Fashion']
    }
})


const Product = mongoose.model("product",productSchema)

module.exports = {
    Product
}