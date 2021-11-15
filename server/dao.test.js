const dao = require("./dao");
const bcrypt = require("bcrypt");
const User = require("./user");


describe("API getProducts", () => {
  test("products", async () => {
    const p = await dao.getProducts();
    expect(p).toBeDefined();
    expect(p[0]).toEqual({
      product_id: 62,
      name: "Apples",
      description: "Amazing taste",
      category: "Fruit & vegetable",
      ref_user: 1,
      price: 1,
      availability: 10,
      unit_of_measure: "100 g",
    });
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
    });
  });
});

describe("API clients", () => {

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

});

/*======= ORDER API TEST ==========*/
describe("API insertOrder", () => {

  beforeAll(async () => {
    //call for clean the DB, removing testing order (id_order = 0)
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
    productsIdList.forEach((obj) => { id_array.push(obj.ref_product); quantity_array.push(obj.quantity); });
    const res = await dao.insertOrder(body, id_array, quantity_array).catch((val) => val);
    res.forEach((tmp) => { expect(tmp).toBeFalsy() })
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
    productsIdList.forEach((obj) => { id_array.push(obj.ref_product); quantity_array.push(obj.quantity); });
    const res = await dao.insertOrder(body, id_array, quantity_array);
    expect(res).toBeTruthy();
  });

});