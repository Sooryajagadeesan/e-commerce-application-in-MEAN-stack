const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, deleteCategory} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

// create category
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

// get category
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategories);

// update category
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

// delete category
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory);



module.exports = router;