const path = require('path');
const express = require('express');

const appController = require("../controllers/app.controller");

const router = express.Router();


router.post("/add-to-cart", appController.addToCart);
router.get("/order-history", appController.orderHistory);
router.post("/buy-cart",appController.buyCart);
router.get("/get-product/:id", appController.getProduct);
router.get("/get-products/:category",appController.getProductsByCategory);
router.get("/get-user-details", appController.getUserDetails);


module.exports=router;