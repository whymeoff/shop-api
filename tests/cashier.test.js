const request = require('supertest')
const app = require('../src/app')

const products = require('../fixtures/products')
const Product = require('../src/models/product')
const Order = require('../src/models/order')

let orderID

test('Should create order', async () => {
    const product = await new Product(products[0]).save()
    expect(product).not.toBeNull()

    const res = await request(app)
        .post('/cashier/createOrder')
        .send({ id: product._id })
        .expect(201)

    orderID = res.body._id
})

test('Should cancel order(state to 3)', async () => {
    const res = await request(app)
        .patch(`/cashier/cancelOrder/${orderID}`)
        .send()
        .expect(200)

    expect(res.body.state).toBe(3)
})

test('Should not cancel order if state > 1(Now 3)', async () => {
    const res = await request(app)
        .patch(`/cashier/cancelOrder/${orderID}`)
        .send()
        .expect(400)
})

test('Should not accept payment', async () => {
    const res = await request(app)
        .post(`/cashier/acceptPayment/${orderID}`)
        .send()
        .expect(400)
})

test('Should accept payments', async () => {
    const order = await new Order({ product: products[0]._id, state: 1, price: products[0].price }).save()

    res = await request(app)
        .post(`/cashier/acceptPayment/${order._id}`)
        .send()
        .expect(200)
})
