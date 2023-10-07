const Product = require("../models/products");

const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await Product.create({ name, description, price });

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }
    if (products.length < 1) {
      return res.status(200).json({ message: "No products yet" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, isInStock } = req.body;

  const product = await Product.findOneAndUpdate({ _id: id }, req.body);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ message: "Product Updated successfully" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(204).json({ product });
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
