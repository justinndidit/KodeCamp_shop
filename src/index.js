const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

const { router: userRoutes } = require("./routes/user");
const { router: productRoutes } = require("./routes/product");
const connectDB = require("./config/dbConnection");

(async function () {
  await connectDB();
  app.listen(port, () => console.log(`Listening on Port ${port}`));
})();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
