require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const { productRouter } = require('./routes/productRouter')


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database Connected Succesfully!')

    app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`)
    })

})
.catch(()=>{
        console.log('Database Connection failed!')
    })

app.use(express.json())
app.use('/api',productRouter)

