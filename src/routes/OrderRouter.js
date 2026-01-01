const express = require('express')
const { isLoggedIn } = require('../Middleware/isLoggedIn')
const { isBuyer } = require('../Middleware/isBuyer')
const { checkout } = require('../Controller/OrderControlller')
const router = express.Router()

router.post('/checkout',isLoggedIn,isBuyer, checkout)
