const express = require("express");
const router = express.Router();

const { getUserById, pushOrderIntoPurchases } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus, getAllOrdersOfUser} = require("../controllers/order");

// route params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

// create order
// router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderIntoPurchases,updateStock,createOrder);

// get all orders (ADMIN)
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);


router.get("/order/all/user/:userId",isSignedIn,isAuthenticated,getAllOrdersOfUser);

// router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);

// update order status (ADMIN)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports = router;