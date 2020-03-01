const request = require('supertest')
const app = require('../src/app')
const Order = require('../src/models/order')

const products = require('../fixtures/products')

test('Should get array of orders', async () => {
    const res = await request(app)
        .get('/seller/orders')
        .send()
        .expect(200)
    expect(Array.isArray(res.body)).toBe(true)
})

test('Should execute order(change state from 0 to 1)', async () => {
    const order = await new Order({ product: products[0]._id, price: products[0].price }).save()

    const res = await request(app)
        .patch(`/seller/orderExecuted/${order._id}`)
        .send()
        .expect(200)

    expect(res.body.state).toBe(1)
})