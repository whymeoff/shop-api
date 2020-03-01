const express = require('express')
const controllers = require('../controllers/admin')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Here!')
})

// Staff routes
router.post('/createStaff', controllers.createStaff)

router.patch('/editStaff/:id', controllers.editStaff)

router.delete('/deleteStaff/:id', controllers.deleteStaff)

// Product routes
router.post('/createProduct', controllers.createProduct)

router.patch('/editProduct/:id', controllers.editProduct)

router.delete('/deleteProduct/:id', controllers.deleteProduct)

module.exports = router