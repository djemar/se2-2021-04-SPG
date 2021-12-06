const supertest = require('supertest');
const app = require('./server')
const request = supertest(app)

describe('Get products API', () => {
    test('Get method', async () => {
        const response = await request.get('/api/products')

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });
});

describe('Get products by category API', () => {
    test('Get products by category success', async () => {
        const category = {category: 'Dairy'}
        const response = await request.post('/api/products').send(category)

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });
    test('Get products by category failure', async () => {
        const category = {a: "b"}
        const response = await request.post('/api/products').send(category)

        expect(response.status).toBe(503)
    });
});

describe('Get users API', () => {
    test('Get method', async () => {
        const response = await request.get('/api/users')

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });
});

describe('Get orders API', () => {
    test('Get all orders method', async () => {
        const response = await request.get('/api/orders')

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Get orders for a client, expected success', async () => {
        const response = await request.get('/api/client-orders/6')

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Get orders for a client, expected failure 503', async () => {
        const response = await request.get('/api/client-orders/1999999')

        expect(response.status).toBe(503)
        expect(response.body).toBeTruthy()
    });

    test('Get orders for a client, expected failure 400', async () => {
        const response = await request.get('/api/client-orders/failure')

        expect(response.status).toBe(400)
        expect(response.body).toBeTruthy()
    });
});

describe('Login API test cases', () => {
    test('Succesful login', async () => {
        const user = {'email': 'employee@spg.com', 'password': 'employee'}
        const response = await request.post('/api/login').send(user);

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Failure login wrong password', async () => {
        const user = {'email': 'employee@spg.com', 'password': 'e'}
        const response = await request.post('/api/login').send(user);

        expect(response.status).toBe(401)
        expect(response.body).toBeTruthy()
    });

    test('Logout response failure', async () => {
        const response = await request.delete('/api/login/current');
        expect(response.status).toBe(401);
    });

    test('Get session failure', async () => {

        const response = await request.get('/api/login/current');
        expect(response.status).toBe(401);
    });
});

describe('Top up API', () => {
    test('Succesful top up', async () => {
        const clientID = 6;
        const recharge = 10;
        const response = await request.post('/api/recharge-wallet/').send({clientID,recharge});

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Error 400 top upup', async () => {
        const clientID = 6;
        const recharge = 10;
        const response = await request.post('/api/recharge-wallet/').send({recharge});

        expect(response.status).toBe(400)
    });

    test('Error 400 #2 top upup', async () => {
        const clientID = 6;
        const recharge = "recharging";
        const response = await request.post('/api/recharge-wallet/').send({clientID, recharge});

        expect(response.status).toBe(400)
    });
});
