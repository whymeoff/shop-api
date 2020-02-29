const express = require('express')
const Order = require('../models/order')

const router = express.Router()

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({ state: 0 })
        if (!orders) return res.status(404).send()

        return res.send(orders)
    } catch (e) {
        return res.status(500).send()
    }
})

router.patch('/orderExecuted/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) throw new Error
        if (order.state !== 0) throw new Error
        order.state = 1 // State 1 = order executed
    
        await order.save()
    
        return res.send()
    } catch (e) {
        return res.status(400).send()
    }
})

module.exports = router