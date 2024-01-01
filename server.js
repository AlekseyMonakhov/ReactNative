const jsonServer = require('json-server')
const server = jsonServer.create({
    host: '192.168.0.4',
})
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()



const users = new Map([
    ["1", {
        name: "John Doe12344",
        email: "some@gmail.com",
        address: "Some Street 123",
        orders: {}
    }]
])

server.use(middlewares)

server.use(jsonServer.bodyParser)

server.get('/users/:id', (req, res) => {
    const id = req.params.id

    if (users.has(id)) {
        res.jsonp(users.get(id))
    } else {
        res.sendStatus(404)
    }
})


server.post('/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.get(id)
    const { name, email, address } = req.body

    if (user) {
        user.name = name
        user.email = email
        user.address = address
        res.jsonp(user)
    } else {
        res.sendStatus(404)
    }
})


server.post('/users/:id/orders', (req, res) => {

    const id = req.params.id
    const user = users.get(id);
    const newOrders = req.body.orders;
    const uniqueId = Math.random().toString(36).substr(2, 9);


    if (user) {
        user.orders[uniqueId] = newOrders;
        res.jsonp({ orderId: uniqueId });
    } else {
        res.sendStatus(404)
    }
})





server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})