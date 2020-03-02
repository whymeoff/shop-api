const Order = require('../models/order')
const Product = require('../models/product')
const Check = require('../models/cashierCheck')

// POST to create order
const createOrder = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id)

        if (!product) throw new Error
        if (product.discount) product.price -= product.price/100*20

        const order = new Order({ product: product._id, price: product.price })

        await order.save()
        return res.status(201).send(order)
    } catch (e) {
        return res.status(400).send()
    }
}

// PATCH to cancel order (state to 3)
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) throw new Error
        if (order.state > 1) throw new Error

        order.state = 3 // State 3 = canceled order
        await order.save()

        return res.send(order)
    } catch (e) {
        return res.status(400).send()
    }
}

// POST to accept payment(change state to 2 and create some cashier check)
const acceptPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) throw new Error
        if (order.state !== 1) throw new Error
        order.state = 2 // State 2 = accepted payment

        const check = await new Check({ product: order.product, price: order.price, cashier: req.user.id, orderDate: order.creationDate }).save()

        await order.save()

        return res.send({ check, order })
    } catch (e) {
        res.status(400).send()
    }
}

// GET to get some check by ID
const getCheck = async (req, res) => {
    try {
        const check = await Check.findById(req.params.id)
        if (!check) throw new Error

        return res.send({ check })
    } catch (e) {
        res.status(400).send()
    }
}

module.exports = {
    createOrder,
    cancelOrder,
    acceptPayment,
    getCheck
}