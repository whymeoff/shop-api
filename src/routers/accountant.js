const express = require('express')
const controllers = require('../controllers/accountant')

const router = express.Router()

router.get('/orders', controllers.getOrders)

module.exports = router