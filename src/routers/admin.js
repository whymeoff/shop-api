const express = require('express')
const controllers = require('../controllers/admin')
const identify = require('../middleware/identify')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Here!')
})

router.post('/createAdmin', controllers.createAdmin)

// Staff routes
router.post('/createStaff', identify.isAdmin, controllers.createStaff)

router.patch('/editStaff/:id', identify.isAdmin, controllers.editStaff)

router.delete('/deleteStaff/:id', identify.isAdmin, controllers.deleteStaff)

// Product routes
router.post('/createProduct', identify.isAdmin, controllers.createProduct)

router.patch('/editProduct/:id', identify.isAdmin, controllers.editProduct)

router.delete('/deleteProduct/:id', identify.isAdmin, controllers.deleteProduct)

module.exports = router