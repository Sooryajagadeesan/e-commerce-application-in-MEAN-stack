const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");

router.param("userId",getUserById);

// get user data
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

// update user
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

// get all purchases of a user, this is directly from the (ORDER schema) (NOT used, alternative user's orders are fetched from the purchases array of the user schema)
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);



module.exports = router;