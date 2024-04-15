const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");

router.use("/users", userRouter);
router.use("/products", productRouter);

module.exports = router;
