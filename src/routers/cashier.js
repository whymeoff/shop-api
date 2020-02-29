const express = require('express')
const Order = require('../models/order')
const Product = require('../models/product')
const Check = require('../models/cashierCheck')

const router = express.Router()

router.get('/', () => {
    console.log('here')
})

router.post('/createOrder/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) throw new Error
        if (product.discount) product.price -= product.price/100*20

        const order = new Order({ product: req.params.id, price: product.price })

        await order.save()
        return res.status(201).send()
    } catch (e) {
        return res.status(400).send()
    }
})

router.patch('/cancelOrder/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) throw new Error
        if (order.state > 1) throw new Error

        order.state = 3 // State 3 = canceled order
        await order.save()

        return res.send()
    } catch (e) {
        return res.status(400).send()
    }
})

router.post('/acceptPayment/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) throw new Error
        if (order.state !== 1) throw new Error
        order.state = 2 // State 2 = accepted payment

        // const check = new Check({ product: order.product, price: order.price, cashier: req.user.id, orderDate: order.creationDate })

        // await check.save()
        await order.save()

        return res.send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router