const request = require('supertest')
const app = require('../src/app')
const Order = require('../src/models/order')
const User = require('../src/models/user')

const products = require('../fixtures/products')
const users = require('../fixtures/users')

let cookie

beforeAll(async () => {
    await new User(users.admin).save()

    await request(app).post('/user/login')
        .send({ email: users.admin.email, password: users.admin.password })
        .expect(res => {
            cookie = res.headers['set-cookie']
        })
})

test('Should get array of orders', async () => {
    const res = await request(app)
        .get('/seller/orders')
        .set('cookie', cookie)
        .send()
        .expect(200)
    expect(Array.isArray(res.body)).toBe(true)
})

test('Should execute order(change state from 0 to 1)', async () => {
    const order = await new Order({ product: products[0]._id, price: products[0].price }).save()

    const res = await request(app)
        .patch(`/seller/orderExecuted/${order._id}`)
        .set('cookie', cookie)
        .send()
        .expect(200)

    expect(res.body.state).toBe(1)
})