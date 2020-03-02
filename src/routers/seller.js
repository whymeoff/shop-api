const express = require('express')
const controllers = require('../controllers/seller')
const identify = require('../middleware/identify')

const router = express.Router()

router.get('/orders', identify.isSeller, controllers.getOrders)

router.patch('/orderExecuted/:id', identify.isSeller, controllers.orderExecuted)

module.exports = router