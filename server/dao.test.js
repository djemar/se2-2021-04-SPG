const dao = require("./dao");

describe("API getProducts", () => {
  test("products", async () => {
    const p = await dao.getProducts();
    expect(p).toBeDefined();
    expect(p[0]).toEqual({
      product_id: 1,
      name: "Apples",
      description: "Amazing taste",
      category: "Fruit & vegetable",
      ref_user: 1,
      price: 1,
      availability: 10,
      unit_of_measure: "kg",
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
      product_id: 24,
      name: "Clarified butter",
      description: "Naturally without lactose",
      category: "Dairy",
      ref_user: 1,
      price: 24,
      availability: 18,
      unit_of_measure: "kg",
    });
  });
});

/*======= ORDER API TEST ==========*/
describe("API insertOrder", () => {

  beforeAll(async () => {
    //call for clean the DB, removing testing order (id_order = 0)
    return dao.deleteTestOrder();
  });

  test("orderMissingData", async () => {
    const body = {
      "ref_user": 1,
      "productList": [
        { "ref_product": 1, "quantity": 1 },
        { "ref_product": 3, "quantity": 3 },
        { "ref_product": 5, "quantity": 1 }
      ],
      "date_order": "222"
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
      "order_id": 0,
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