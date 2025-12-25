const express = require('express');
const { isBuyer } = require('../Middleware/isBuyer');
const { isLoggedIn } = require('../Middleware/isLoggedIn');
const { viewCart, addToCart, deleteFromCart, cartSummary } = require('../Controller/CartController');
const router = express.Router();


router.get('/cart',isLoggedIn, isBuyer, viewCart);
router.post('/cart/:id',isLoggedIn, isBuyer, addToCart);
router.delete('/cart/:id', isLoggedIn, isBuyer, deleteFromCart)
router.get('/cart/summary', isLoggedIn, isBuyer, cartSummary)



module.exports = { 
    CartRouter: router 
}
