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
    expect(p[0]).toHaveProperty('product_id', 85);
  });
});

/*======= USER API TEST ==========*/

/* User object to be sent to the API for testing purposes:
{"name": "DDD",
 "surname": "ZZZ",
 "email": "mail@polito.it",
 "hash": "xfxfxfxfx",
 "Type": "Farmer",
 "address": "via Torino 2",
 "phone": "5555555555",
 "country": "Italy",
 "city": "Torino",
 "zip_code": 10129 }
 */

describe("API users", () => {

  test("Create new user object", () => {
    const user = new User({
      name: "Luke", surname: "Skywalker", email: "J3d1@polito.it", hash: "dsidshof", Type: "Client",
      address: "via Roma 44", phone: "3333333333", country: "Italy", citY: "Torino", zip_code: 10129
    });
    expect(user.name).toBe("Luke");
  });

  test("clientInsertionSuccess", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const userObject = new User({
      name: "John", surname: "Smith", email: "john.smith@polito.it", hash: h, Type: "Client",
      address: "via Roma 44", phone: "3333333333", country: "Italy", city: "Torino", zip_code: 10129
    });
    expect(userObject).toBeDefined();
    expect(userObject).toEqual({
      name: "John",
      surname: "Smith",
      email: "john.smith@polito.it",
      hash: h,
      Type: "Client",
      address: "via Roma 44",
      phone: "3333333333",
      country: "Italy",
      city: "Torino",
      zip_code: 10129
    });
    let u = await dao.insertUser(userObject);
    await expect(u.user_id).toBeDefined();
    await expect(u.Type).toEqual("Client");
    await expect(u.wallet_balance).toEqual(0.0);
    await expect(u.city).toEqual("Torino");

    // Removing from database for remaining consistent
    let res = await dao.removeUser(u.user_id);
    await expect(res).toBeTruthy();
  });

  test("farmerInsertionSuccess", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const userObject = new User({
      name: "Jane", surname: "Smith", email: "jane.smith@polito.it", hash: h, Type: "Farmer",
      address: "via Roma 44", phone: "3333333333", country: "Italy", city: "Torino", zip_code: 10129
    });
    expect(userObject).toBeDefined();
    expect(userObject).toEqual({
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@polito.it",
      hash: h,
      Type: "Farmer",
      address: "via Roma 44",
      phone: "3333333333",
      country: "Italy",
      city: "Torino",
      zip_code: 10129
    });
    let u = await dao.insertUser(userObject);
    await expect(u.user_id).toBeDefined();
    await expect(u.Type).toEqual("Farmer");
    await expect(u.wallet_balance).toBeNull();
    await expect(u.zip_code).toEqual(10129);

    // Removing from database for remaining consistent
    let res = await dao.removeUser(u.user_id);
    await expect(res).toBeTruthy();
  });

  test("userInsertionEmptyObject", async () => {
    const e = await dao.insertUser("").catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString1", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    console.log(h); // fake hash generated just for testing purposes
    const e = await dao.insertUser({
      name: 999, surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString2", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    console.log(h); // fake hash generated just for testing purposes
    const e = await dao.insertUser({
      name: "John", surname: 999,
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString3", async () => {
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: 999, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString4", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: 999, address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString5", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: 999, phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString6", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: 999,
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString7", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: 999, city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotString8", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: 999, zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userInsertionNotInteger", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "Client", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: "sample string"
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });
  test("userInsertionWrongType", async () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const h = bcrypt.hashSync("generic", salt);
    const e = await dao.insertUser({
      name: "John", surname: "Smith",
      email: "john.smith@polito.it", hash: h, Type: "NotPredefinedType", address: "via Roma 44", phone: "3333333333",
      country: "Italy", city: "Torino", zip_code: 10129
    }).catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("userRemovingError", async () => {
    let e = await dao.removeUser("sample string").catch((error) => error);
    await expect(e).toBeDefined();
  });

  test("Get all users", async () => {
    const u = await dao.getAllUsers();
    console.log("Found", u[0])
    expect(u).toBeDefined();
    let employee = u.find((user) => user.email === "employee@spg.com");
    expect(employee).toHaveProperty('email', "employee@spg.com");
  });

});

/*======= ORDER API TEST ==========*/
describe("API Order", () => {

  beforeAll(async () => {
    //call for clean the DB
    let orders = await dao.getAllOrders();
    return dao.deleteTestOrder(orders[orders.length - 1].order_id);
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
    expect(o[0]).toHaveProperty('order_id', o[0].order_id);
  });

  test("orderByClientIdSuccess", async () => {
    const o = await dao.getAllOrders();
    console.log("Found", o[0])
    expect(o).toBeDefined();
    expect(o[0]).toHaveProperty('order_id', o[0].order_id);
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
    let ord = await dao.getAllOrders();
    //await dao.setDeliveredOrder(ord[0].order_id); // not executing the status updating (on purpose)
    const ord2 = await dao.getAllOrders();
    const o = ord2.filter(order => order.order_id === ord[0].order_id);
    expect(o[0]).toHaveProperty('status', 'pending');
  });

  test("changeOrderSuccess", async () => {

    let ord = await dao.getAllOrders();
    expect(ord[0]).not.toEqual(ord[ord.length - 1]);
    await dao.setDeliveredOrder(ord[ord.length - 1].order_id);
    const ord2 = await dao.getAllOrders();
    const o = ord2.filter(order => order.order_id === ord2[ord.length - 1].order_id);
    expect(o[0]).toHaveProperty('status', 'delivered');
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
    let prevWallet = c[0].wallet_balance;
    let res = await dao.updateClientWallet(c[0].user_id, 2);
    expect(res).toBeTruthy();
    let c2 = await dao.getAllUsers();
    expect(c2[0].wallet_balance).toEqual(prevWallet + 2);
  });

  test("updateWalletSuccess2", async () => {
    await expect(async () => {
      await dao.updateClientWallet(2, 2.2);
    }).toBeTruthy();
  });

  test("setPendingCancellationOrderError", async () => {
    let ord = await dao.getAllOrders();
    //await dao.setPendingCancellationdOrder(ord[0].order_id); // not executing the status updating (on purpose)
    const ord2 = await dao.getAllOrders();
    const o = ord2.filter(order => order.order_id === ord[0].order_id);
    expect(o[0]).toHaveProperty('status', 'pending');
  });

  test("setPendingCancellationOrderSuccess", async () => {

    let ord = await dao.getAllOrders();
    expect(ord[0]).not.toEqual(ord[ord.length - 1]);
    await dao.setPendingCancellationdOrder(ord[ord.length - 1].order_id);
    const ord2 = await dao.getAllOrders();
    const o = ord2.filter(order => order.order_id === ord2[ord.length - 1].order_id);
    expect(o[0]).toHaveProperty('status', 'pending_cancellation');
  });


});

describe('login API', () => {
  test('Login success', async () => {
    const user = { username: 'equijoin@join.it', password: 'EQUIJOIN' };
    const res = dao.getUser('equijoin@join.it', 'EQUIJOIN');
    expect(res).toBeDefined()
  });

  test('Login failure', async () => {
    const user = { username: 'equijoin@join.it', password: 'EQUI' };
    const res = dao.getUser('equijoin@join.it', 'EQ');
    expect(res).rejects.toBeFalsy();
  });
});