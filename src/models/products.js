const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  //name(string), description(string) price(number) and isInStock(Boolean)
  name: {
    type: String,
    required: [true, "Product must have  a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please describe the product"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("shopitem", productSchema);

module.exports = Product;
