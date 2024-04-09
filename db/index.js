const mongoose = require("mongoose");

const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db funcionando"))
    .catch((err) => console.log(err));
};

module.exports = db;
