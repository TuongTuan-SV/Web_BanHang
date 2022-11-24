const router = require('express').Router()
const productCTL = require('../controllers/productCTL')

router.route('/products')
    .get(productCTL.getProducts)
    .post(productCTL.createProducts)

router.route('/products/:id')
    .delete(productCTL.deleteProducts)
    .put(productCTL.updateProducts)

module.exports = router