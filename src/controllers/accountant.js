const Order = require('../models/order')

// GET orders by date(using query string ?from=year-month-day&to=year-moth-day) or just all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if (!orders) return res.status(404).send()

        let sortOrders
        if (req.query.from && req.query.to) {
            const from = new Date(req.query.from).getTime()
            const to = new Date(req.query.to).getTime()

            if (from > to) throw new Error

            sortOrders = orders.filter((order) => {
                return order.creationDate >= from && order.creationDate <= to
            })

            if (sortOrders.length === 0) return res.send([])
        }

        return res.send(sortOrders || orders)
    } catch (e) {
        return res.status(400).send()
    }
}

module.exports = {
    getOrders
}