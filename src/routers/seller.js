const express = require('express')
const controllers = require('../controllers/seller')

const router = express.Router()

router.get('/orders', controllers.getOrders)

router.patch('/orderExecuted/:id', controllers.orderExecuted)

module.exports = router