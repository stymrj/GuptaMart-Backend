const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength : 2,
        maxLength : 10,
        required : true
    },
    lastName : {
        type : String,
        minLength : 2,
        maxLength : 10,
    },
    username : {
        type : String,
        unique : true,
        minLength : 2,
        maxLength : 12,
        required : true,
        immutable : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['buyer','seller','admin'],
    },
    phoneNumber : {
        type : String,
        required : true,
        minLength :10
    }
})

const User = mongoose.model('user',userSchema)

module.exports = {
    User
}