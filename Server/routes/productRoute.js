const express = require('express');
const { getProdcut, addProduct, editProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/product', getProdcut)
router.post('/product', addProduct)
router.patch('/product/:id', editProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router