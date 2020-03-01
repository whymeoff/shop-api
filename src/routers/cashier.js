const express = require('express')
const controllers = require('../controllers/cashier')

const router = express.Router()

router.get('/', () => {
    console.log('here')
})

router.post('/createOrder/', controllers.createOrder)

router.patch('/cancelOrder/:id', controllers.cancelOrder)

router.post('/acceptPayment/:id', controllers.acceptPayment)

module.exports = router