const express = require('express')
const controllers = require('../controllers/accountant')
const identify = require('../middleware/identify')

const router = express.Router()

router.get('/orders', identify.isAccountant, controllers.getOrders)

module.exports = router