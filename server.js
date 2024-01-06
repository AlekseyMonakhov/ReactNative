const jsonServer = require('json-server')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server = jsonServer.create({
    host: '192.168.0.4',
})
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = 'your-very-secure-secret';
const SALT_ROUNDS = 10;

function isAuthenticated(req, res, next) {

    const authorization = req.headers.authorization;

    if (authorization) {
        const [type, token] = authorization.split(' ');

        try {
            const { userId } = jwt.verify(token, SECRET_KEY);
            req.userId = userId;
            next();
        } catch (error) {

            res.status(401).jsonp({ message: 'Unauthorized' });
        }
    } else {
        res.status(401).jsonp({ message: 'Unauthorized' });
    }
}





const users = new Map([
    ["1", { id: 1, name: 'John Doe', email: 'somne@gmial.com' }]
])



server.use(middlewares)

server.use(jsonServer.bodyParser)

server.post("/registration", async (req, res) => {
    const { email, password } = req.body;
    const isUserExist = [...users.values()].some(user => user.email === email);


    if (isUserExist) {
        return res.status(400).jsonp({ message: 'User already exist' });
    }



    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { id: (users.size + 1).toString(), email, password: hashedPassword, orders: {}, name: '', address: '' };

    users.set(newUser.id, newUser);

    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).jsonp({ token });
});





server.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = [...users.values()].find(user => user.email === email);
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
            res.jsonp({ token });
        } else {
            res.status(400).jsonp({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(400).jsonp({ message: 'Invalid credentials' });
    }



})

server.get('/users/:id', isAuthenticated, (req, res) => {
    const id = req.params.id

    console.log(users);



    if (users.has(id)) {
        const { password, ...user } = users.get(id)

        res.jsonp(user)
    } else {
        res.sendStatus(404)
    }
})





server.post('/users/:id', isAuthenticated, (req, res) => {
    const id = req.params.id
    const user = users.get(id)
    const { name, email, address } = req.body



    if (user) {
        user.name = name
        user.email = email
        user.address = address

        const { password, ...updatedUser } = users.get(id)

        res.status(201).jsonp(updatedUser)
    } else {
        res.sendStatus(404)
    }
})


server.post('/users/:id/orders', isAuthenticated, (req, res) => {

    const id = req.params.id
    const user  = users.get(id)
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