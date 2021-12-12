const supertest = require('supertest');
const app = require('./server')
const request = supertest(app)
const dao = require("./dao");

describe('Get products API', () => {
    test('Get method', async () => {
        const response = await request.get('/api/products')

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });
});

describe('Get products by category API', () => {
    test('Get products by category success', async () => {
        const category = { category: 'Dairy' }
        const response = await request.post('/api/products').send(category)

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });
    test('Get products by category failure', async () => {
        const category = { a: "b" }
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
        const user = { 'email': 'employee@spg.com', 'password': 'employee' }
        const response = await request.post('/api/login').send(user);

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Failure login wrong password', async () => {
        const user = { 'email': 'employee@spg.com', 'password': 'e' }
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
        const response = await request.post('/api/recharge-wallet/').send({ clientID, recharge });

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    });

    test('Error 400 top upup', async () => {
        const clientID = 6;
        const recharge = 10;
        const response = await request.post('/api/recharge-wallet/').send({ recharge });

        expect(response.status).toBe(400)
    });

    test('Error 400 #2 top upup', async () => {
        const clientID = 6;
        const recharge = "recharging";
        const response = await request.post('/api/recharge-wallet/').send({ clientID, recharge });

        expect(response.status).toBe(400)
    });
});

describe('Create product API', () => {
    test('Product added success', async () => {
        const product = {
            "name": "supreme test lord",
            "description": "solo equijoin",
            "category": "Dairy",
            "ref_farmer": 1,
            "price": 69,
            "availability": 2000,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        };

        const response = await request.post('/api/new-product/').send(product);

        let id = response.body.product_id;
        expect(response.status).toBe(200)

        const res = await dao.removeProduct(id);
        expect(res).toBeTruthy();
    });

    test('Error insert product wrong availability, 400', async () => {
        const product = {
            "name": "supreme test lord",
            "description": "solo equijoin",
            "category": "Dairy",
            "ref_farmer": 1,
            "price": "wrong",
            "availability": 200,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        }
        const response = await request.post('/api/new-product/').send(product);

        expect(response.status).toBe(400)

    });

    test('Error insert product wrong price, 400', async () => {
        const product = {
            "name": "supreme test lord",
            "description": "solo equijoin",
            "category": "Dairy",
            "ref_farmer": 1,
            "price": "wrong",
            "availability": 200,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        }
        const response = await request.post('/api/new-product/').send(product);

        expect(response.status).toBe(400)

    });
    test('Error insert product wrong ref_farmer, 400', async () => {
        const product = {
            "name": "supreme test lord",
            "description": "solo equijoin",
            "category": "Dairy",
            "ref_farmer": "wrong",
            "price": 55,
            "availability": 200,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        }
        const response = await request.post('/api/new-product/').send(product);

        expect(response.status).toBe(400)
    });
});

describe('Edit product API', () => {
    test('Product edited success', async () => {
        const product = {
            "name": "supreme test lord2",
            "description": "solo equijoin",
            "category": "Dairy",
            "ref_farmer": 1,
            "price": 69,
            "availability": 2000,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        };

        const response = await request.post('/api/new-product/').send(product);

        let id = response.body.product_id;
        expect(response.status).toBe(200)

        const product2 = {
            "product_id": response.body.product_id,
            "name": "supreme test lord2 edited",
            "description": "solo equijoin",
            "category": "random",
            "ref_farmer": 1,
            "price": 69,
            "availability": 2000,
            "unit_of_measure": "1 babilonia",
            "image_path": "https://m.media-amazon.com/images/I/61vRV720szS._AC_SX466_.jpg",
            "start_date": "2021-12-10",
            "end_date": "2021-12-17"
        };

        const responseEdit = await request.post('/api/update-product/').send(product2);

        expect(responseEdit.body).toEqual(product2);
        expect(responseEdit.body).not.toEqual(product);

        const res = await dao.removeProduct(id);
        expect(res).toBeTruthy();
    });
});

describe('Insert new user API', () => {

    test('Insert method Success', async () => {
        const user = {
            "name": "DDD",
            "surname": "ZZZ",
            "email": "mail@polito.it",
            "hash": "xfxfxfxfx",
            "Type": "Farmer",
            "address": "via Torino 2",
            "phone": "5555555555",
            "country": "Italy",
            "city": "Torino",
            "zip_code": 10129
        }
        const response = await request.post('/api/new-user').send(user);
        expect(response.status).toBe(200)
    })

    test('Wrong Insert method', async () => {
        const user = {
            "surname": "ZZZ",
            "email": "mail@polito.it",
            "hash": "xfxfxfxfx",
            "Type": "Farmer",
            "address": "via Torino 2",
            "phone": "5555555555",
            "country": "Italy",
            "city": "Torino",
            "zip_code": 10129
        }
        const response = await request.post('/api/new-user').send(user);
        expect(response.status).toBe(400)
    })

    test('Wrong Insert method 2', async () => {
        const user = {
            "name": "DDD",
            "surname": 111,
            "email": "mail@polito.it",
            "hash": "xfxfxfxfx",
            "Type": "Farmer",
            "address": "via Torino 2",
            "phone": "5555555555",
            "country": "Italy",
            "city": "Torino",
            "zip_code": 10129
        }
        const response = await request.post('/api/new-user').send(user);
        expect(response.status).toBe(400)
    })

    test('Wrong Insert method 3', async () => {
        const user = {
            "name": "DDD",
            "surname": "ZZZ",
            "email": "mail@polito.it",
            "hash": "xfxfxfxfx",

            "address": "via Torino 2",
            "phone": "5555555555",
            "country": "Italy",
            "city": "Torino",
            "zip_code": 10129
        }
        const response = await request.post('/api/new-user').send(user);
        expect(response.status).toBe(400)
    })

});

describe('Insert Order API', () => {

    test('Insert Correct Order', async () => {
        const order = {
            "ref_user": 1,
            "productList":
                [{ "ref_product": 1, "quantity": 1 },
                { "ref_product": 3, "quantity": 3 },
                { "ref_product": 5, "quantity": 1 }],
            "date_order": "222"
        };
        const response = await request.post('/api/order').send(order);
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    })

    test('Insert Wrong Order', async () => {
        const order = {
            "productList":
                [{ "ref_product": 1, "quantity": 1 },
                { "ref_product": 3, "quantity": 3 },
                { "ref_product": 5, "quantity": 1 }],
            "date_order": "222"
        };
        const response = await request.post('/api/order').send(order);
        expect(response.status).toBe(400);
    })
});

describe('Set delivered order API', () => {

    test('Set Delivered Order API Success', async () => {
        const body = { "order_id": 1 }
        const response = await request.post('/api/set-delivered-order/').send(body)
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    test('Set Delivered Order API Wrong', async () => {
        const body = { "order_id": "" };
        const response = await request.post('/api/set-delivered-order/').send(body)
        expect(response.status).toBe(400)
    })
})

describe('Delete Order API', () => {

    test('Delete Order Success', async () => {
        const body = {
            "ref_user": 1,
            "productList":
                [{ "ref_product": 1, "quantity": 1 },
                { "ref_product": 3, "quantity": 3 },
                { "ref_product": 5, "quantity": 1 }],
            "date_order": "222"
        };
        let productsIdList = body.productList;
        var id_array = [], quantity_array = [];
        productsIdList.forEach((obj) => {
            id_array.push(obj.ref_product);
            quantity_array.push(obj.quantity);
        });
        const res = await dao.insertOrder(body, id_array, quantity_array);
        const n = await dao.getAllOrders();
        const id = n[n.length - 1].order_id;
        const response = await request.delete('/api/delete-order/' + id)
        expect(response.status).toBe(200);

    })

    test('Delete Order Fail', async () => {
        const response = await request.delete('/api/delete-order/')
        expect(response.status).toBe(404);
    })

    test('Delete Order Fail 2', async () => {
        const response = await request.delete('/api/delete-order/' + "test")
        expect(response.status).toBe(400);
    })
})

describe('Get Orders by ClientID API', () => {

    test('Get Orders Success', async () => {
        const response = await request.get('/api/client-orders/1');
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy();
    })

    test('Get Orders Fail', async () => {
        const response = await request.get('/api/client-orders');
        expect(response.status).toBe(404)
    })
})

describe('Set pending cancellation order API', () => {

    test('Set Pending Cancellation Order API Success', async () => {
        const body = { "order_id": 2 }
        const response = await request.post('/api/set-pending-cancellation-order/').send(body)
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    test('Set Pending Cancellation API Wrong', async () => {
        const body = { "order_id": "" };
        const response = await request.post('/api/set-pending-cancellation-order/').send(body)
        expect(response.status).toBe(400)
    })
})

describe("Set all pending cancellation order API", () => {
    test('Set All Pending Cancellation Order API Success', async () => {
        const response = await request.get('/api/set-all-pending-cancellation-order/')
        expect(response.body).toBeTruthy()
    })
})
