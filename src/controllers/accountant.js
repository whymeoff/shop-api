const Order = require('../models/order')

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if (!orders) return res.status(404).send()

        let sortOrders
        if (req.query.from && req.query.to) {
            const from = new Date(from).getTime()
            const to = new Date(to).getTime()

            if (from > to) throw new Error

            sortOrders = orders.filter((order) => {
                return order.creationTime >= from && order.creationTime <= to
            })

            if (sortOrders.length === 0) return res.status(404).send()
        }

        return res.send(sortOrders || orders)
    } catch (e) {
        return res.status(400).send()
    }
}

module.exports = {
    getOrders
}