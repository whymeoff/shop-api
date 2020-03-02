const express = require('express')
const controllers = require('../controllers/cashier')
const identify = require('../middleware/identify')

const router = express.Router()

router.get('/', () => {
    console.log('here')
})

router.post('/createOrder/', identify.isCashier, controllers.createOrder)

router.patch('/cancelOrder/:id', identify.isCashier, controllers.cancelOrder)

router.post('/acceptPayment/:id', identify.isCashier, controllers.acceptPayment)

router.get('/getCheck/:id', identify.isCashier, controllers.getCheck)

module.exports = router