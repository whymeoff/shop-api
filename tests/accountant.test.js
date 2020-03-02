const request = require('supertest')
const app = require('../src/app')
const Product = require('../src/models/product')
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

test('Should get array of orders by date', async () => {
    await Order.deleteMany()

    for (let i = 0; i < products.length; i++) {
        const product = await new Product(products[i]).save()
        await new Order({ product: product._id, price: product.price, creationDate: product.creationDate }).save()
    }

    const res = await request(app)
        .get('/accountant/orders?from=2019-4-4&to=2020-10-10')
        .set('cookie', cookie)
        .send()
        .expect(200)

    const from = new Date('2019-4-4').getTime()
    const to = new Date('2020-10-10').getTime()

    for (let i = 0; i < res.body.length; i++) {
        expect(res.body[i].creationDate >= from && res.body[i].creationDate <= to).toBe(true)
    }
})