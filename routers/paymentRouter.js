const router = require('express').Router()
const PaymentCTL = require('../controllers/paymentCTL')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/payment')
    .get( PaymentCTL.getPayment)
    .post(auth, PaymentCTL.createPayment)

module.exports = router