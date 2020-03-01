const Order = require('../models/order')

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ state: 0 })

        return res.send(orders)
    } catch (e) {
        return res.status(500).send()
    }
}

const orderExecuted = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) throw new Error
        if (order.state !== 0) throw new Error
        order.state = 1 // State 1 = order executed
    
        await order.save()
    
        return res.send(order)
    } catch (e) {
        return res.status(400).send()
    }
}

module.exports = {
    getOrders,
    orderExecuted
}