const express = require('express')

const router = express.Router();
const productsController = require('../controllers/products')

router.post('/product', productsController.createProduct)
router.get('/products', productsController.getAllProducts)


// router.put('/products', (req, res, next) => {
//     res.json({
//         name: "Eric Hansdeka",
//         email: "erichansdeka78@gmail.com"
//     });
//     next();
// })


// router.delete('/products', (req, res, next) => {
//     res.json({
//         name: "Eric Hansdeka",
//         email: "erichansdeka78@gmail.com"
//     });
//     next();
// })





module.exports = router