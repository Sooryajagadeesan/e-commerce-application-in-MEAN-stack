const express = require("express");
const router = express.Router();
const { signup, signin, signout, isSignedIn } = require("../controllers/authentication");
const { check } = require('express-validator');

// sign up 
router.post("/signup",
    check("name").isLength({ min: 3}).withMessage("name must be atleast 3 characters long"),
    check("email").isEmail().withMessage("Email is invalid"),
    check("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
    signup);

// sign in
router.post("/signin",
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min:1}).withMessage("Password is required"),
    signin);

// sign out
router.get("/signout",signout);


module.exports = router;