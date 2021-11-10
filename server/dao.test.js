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
