const express = require("express");
const router = express.Router();



const { getProductById, createProduct, getProduct, getProductPhoto, updateProduct, deleteProduct, getAllProducts,getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

router.param("productId",getProductById);
router.param("userId",getUserById);

// create product
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

// get a product by id
router.get("/product/:productId",getProduct);

// get product photo
router.get("/product/photo/:productId",getProductPhoto);

// update product (ADMIN)
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

// delete product (ADMIN)
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

// get all products and categories
router.get("/products",getAllProducts);
router.get("/product/categories",getAllUniqueCategories);

module.exports = router;