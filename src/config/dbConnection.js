const mongoose = require("mongoose");

const connctDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DataBase connection established");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connctDB;
