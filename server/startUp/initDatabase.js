const Product = require("../models/Product");
const Category = require("../models/Category");

const productsMock = require("../mock/products.json");
const categoriesMock = require("../mock/categories.json");

module.exports = async () => {
  const product = await Product.find();
  if (product.length !== productsMock.length) {
    await createInitialEntity(Product, productsMock);
  }

  const category = await Category.find();
  if (category.length !== categoriesMock.length) {
    await createInitialEntity(Category, categoriesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
      data.map(async item => {
        try {
          delete item._id;
          const newItem = new Model(item);
          await newItem.save();
          return newItem;
        } catch (e) {
          return e;
        }
      })
  );
}
