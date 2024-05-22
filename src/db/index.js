const mongoose = require("mongoose");

const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/")
    .then(() => console.log("db funcionando"))
    .catch((err) => console.log(err));
};

module.exports = db;
