const request = require('supertest')
const app = require('../src/app')

const products = require('../fixtures/products')
const users = require('../fixtures/users')
const Product = require('../src/models/product')
const Order = require('../src/models/order')
const User = require('../src/models/user')

let orderID, cookie

beforeAll(async () => {
    await new User(users.admin).save()

    await request(app).post('/user/login')
        .send({ email: users.admin.email, password: users.admin.password })
        .expect(res => {
            cookie = res.headers['set-cookie']
        })
})

test('Should create order', async () => {
    const product = await new Product(products[0]).save()
    expect(product).not.toBeNull()

    const res = await request(app)
        .post('/cashier/createOrder')
        .set('cookie', cookie)
        .send({ id: product._id })
        .expect(201)

    orderID = res.body._id
})

test('Should cancel order(state to 3)', async () => {
    const res = await request(app)
        .patch(`/cashier/cancelOrder/${orderID}`)
        .set('cookie', cookie)
        .send()
        .expect(200)

    expect(res.body.state).toBe(3)
})

test('Should not cancel order if state > 1(Now 3)', async () => {
    const res = await request(app)
        .patch(`/cashier/cancelOrder/${orderID}`)
        .set('cookie', cookie)
        .send()
        .expect(400)
})

test('Should not accept payment', async () => {
    const res = await request(app)
        .post(`/cashier/acceptPayment/${orderID}`)
        .set('cookie', cookie)
        .send()
        .expect(400)
})

test('Should accept payments', async () => {
    const order = await new Order({ product: products[0]._id, state: 1, price: products[0].price }).save()

    res = await request(app)
        .post(`/cashier/acceptPayment/${order._id}`)
        .set('cookie', cookie)
        .send()
        .expect(200)
})
