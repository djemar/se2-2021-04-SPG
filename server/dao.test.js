const dao = require("./dao");
const bcrypt = require("bcrypt");
const User = require("./user");

/*======= PRODUCT API TEST ==========*/
describe("API getProducts", () => {
  test("products", async () => {
    const p = await dao.getProducts();
    expect(p).toBeDefined();
    expect(p[0]).toHaveProperty('product_id', 62)
    expect(p[0]).toHaveProperty('name', "Apples")
    expect(p[0]).toHaveProperty('description', "Amazing taste")
    expect(p[0]).toHaveProperty('category', "Fruit & vegetable")
  });

  test("productsCategoryError", async () => {
    await expect(async () => {
      await dao.getProductsByCategory("nocat");
    }).rejects.toBeFalsy();
  });

  test("productsCategoryError2", async () => {
    await expect(async () => {
      await dao.getProductsByCategory("");
    }).rejects.toBeFalsy();
  });

  test("productsCategoryError3", async () => {
    await expect(async () => {
      await dao.getProductsByCategory(22);
    }).rejects.toBeFalsy();
  });

  test("productsCategorySuccess", async () => {
    const p = await dao.getProductsByCategory("Dairy");
    expect(p).toBeDefined();
    expect(p[0]).toEqual({
      product_id: 85,
      name: "Clarified butter",
      description: "Naturally without lactose",
      category: "Dairy",
      ref_user: 1,
      price: 24,
      availability: 18,
      unit_of_measure: "50 g",
      image_path: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    });
  });
});

/*======= USER API TEST ==========*/
describe("API users", () => {

  test("Create new user object", () => {
    const user = new User("Luke", "Skywalker", "J3d1", "dsidshof");
    expect(user.name).toBe("Luke");
  });

  test("userInsertionSuccess", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const userObject = new User("John", "Smith", "john.smith@polito.it", h);
    expect(userObject).toBeDefined();
    expect(userObject).toEqual({
      name: "John",
      surname: "Smith",
      email: "john.smith@polito.it",
      hash: h
    });
    let id = await dao.insertClient(userObject);
    await expect(id).toBeDefined();

    // Removing from database for remaining consistent
    let res = await dao.removeClient(id);
    await expect(res).toBeTruthy();
  });

  test("userInsertionEmptyObject", async () => {
    const e = await dao.insertClient("").catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString1", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    console.log(h); // fake hash generated just for testing purposes
    const e = await dao.insertClient({
      name: 999, surname: "Smith",
      email: "john.smith@polito.it", hash: h
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString2", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    console.log(h); // fake hash generated just for testing purposes
    const e = await dao.insertClient({
      name: "John", surname: 999,
      email: "john.smith@polito.it", hash: h
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString3", async () => {
    const e = await dao.insertClient({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: 999
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userRemovingError", async () => {
    let e = await dao.removeClient("sample string").catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("Get all users", async () => {
    const u = await dao.getAllUsers();
    console.log("Found", u[0])
    expect(u).toBeDefined();
    expect(u[0]).toHaveProperty('user_id', 1);
    expect(u[0]).toHaveProperty('name', "Mario");
    expect(u[0]).toHaveProperty('surname', "Biondi");
    expect(u[0]).toHaveProperty('email', "farmer@polito.it");
    expect(u[0]).toHaveProperty('hash', "farmer");
    expect(u[0]).toHaveProperty('Type', "Farmer");
    expect(u[0]).toHaveProperty('wallet_balance', null);
  });

});

/*======= ORDER API TEST ==========*/
describe("API Order", () => {

  beforeAll(async () => {
    //call for clean the DB
    return dao.deleteTestOrder(1);
  });

  test("orderMissingData", async () => {
    const body = {
      "ref_user": 1,
      "productList": [
        { "ref_product": 1, "quantity": 1 },
        { "ref_product": 3, "quantity": 3 },
        { "ref_product": 5, "quantity": 1 }
      ],
    };
    let productsIdList = body.productList;
    var id_array = [], quantity_array = [];
    productsIdList.forEach((obj) => {
      id_array.push(obj.ref_product);
      quantity_array.push(obj.quantity);
    });
    const res = await dao.insertOrder(body, id_array, quantity_array).catch((val) => val);
    res.forEach((tmp) => {
      expect(tmp).toBeFalsy()
    })
  });

  // This should be the last one since it adds order in DB
  // Remember that it will fail if the data are already in the DB 
  test("orderSuccess", async () => {
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
    expect(res).toBeTruthy();
  });

  test("Get all orders", async () => {
    const o = await dao.getAllOrders();
    console.log("Found", o[0])
    expect(o).toBeDefined();
    expect(o[0]).toHaveProperty('order_id', 1);
    expect(o[0]).toHaveProperty('ref_product', 1);
    expect(o[0]).toHaveProperty('ref_user', 1);
    expect(o[0]).toHaveProperty('date_order', "222");
    expect(o[0]).toHaveProperty('quantity', 1);
    expect(o[0]).toHaveProperty('status', "pending");
  });

  test("orderByClientIdSuccess", async () => {
    const o = await dao.getOrdersByClientId(1);
    console.log("Found", o[0])
    expect(o).toBeDefined();
    expect(o[0]).toHaveProperty('order_id', 1);
    expect(o[0]).toHaveProperty('ref_product', 1);
    expect(o[0]).toHaveProperty('ref_user', 1);
    expect(o[0]).toHaveProperty('date_order', "222");
    expect(o[0]).toHaveProperty('quantity', 1);
    expect(o[0]).toHaveProperty('status', "pending");
  });

  test("orderByClientIdError1", async () => {
    await expect(async () => {
      await dao.getOrdersByClientId("nocat");
    }).rejects.toBeFalsy();
  });

  test("orderByClientIdError2", async () => {
    await expect(async () => {
      await dao.getOrdersByClientId("");
    }).rejects.toBeFalsy();
  });

  test("orderByClientIdError3", async () => {
    await expect(async () => {
      await dao.getOrdersByClientId(22);
    }).rejects.toBeFalsy();
  });

  test("changeOrderError", async () => {
    await dao.setDeliveredOrder();
    const o = await dao.getOrdersByClientId(1);
    expect(o[0]).toHaveProperty('status', 'pending')
  });

  test("changeOrderSuccess", async () => {
    await dao.setDeliveredOrder(1);
    const o = await dao.getOrdersByClientId(1);
    expect(o[0]).toHaveProperty('status', 'delivered')
  });

  test("updateWalletError1", async () => {
    await expect(async () => {
      await dao.updateClientWallet(2, -2);
    }).rejects.toEqual("Negative amount");
  });

  test("updateWalletError2", async () => {
    await expect(async () => {
      await dao.updateClientWallet(2, -2.2);
    }).rejects.toEqual("Negative amount");
  });

  test("updateWalletSuccess", async () => {
    let c = await dao.getAllUsers();
    let v = c[1].wallet_balance;
    await dao.updateClientWallet(2, 2);
    c = await dao.getAllUsers();
    expect(c[1].wallet_balance).toEqual(v + 2);
  });

  test("updateWalletSuccess2", async () => {
    await expect(async () => {
      await dao.updateClientWallet(2, 2.2);
    }).toBeTruthy();
  });


});

