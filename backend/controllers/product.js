const Product = require("../models/product");

const _ = require("lodash");
const multer = require("multer"); // for file uploads (multipart data)
const fs = require("fs");
const path = require("path");

// creating a storage to upload files to the DB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
// preparing for getting file with field name 'photo' from the front end
const upload = multer({  storage: storage , limits :{fileSize: 3000000} }).single("photo");

// populate req.product
const getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err,product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found in DB"
            })
        }
        req.product = product;
        next();
    })
}

// creating a product
const createProduct = (req,res) => {
    upload(req,res,function(err) {
        if(err instanceof multer.MulterError) {
            return res.status(400).json({
                error: "File size too large, upload a file with size less than 3 MB"
            })
        } else if(err) {
            return res.status(400).json({
                error: err
            })
        }

        const {name, description, price, category, stock} = req.body;
        let errorResponse = "";

        if(!name || !description || !price || !category || !stock) {

            if(!name) {
                errorResponse += "Name is required, ";
            }

            if(!description) {
                errorResponse += "Description is required, ";
            }

            if(!price) {
                errorResponse += "Price is required, ";
            }

            if(!category) {
                errorResponse += "Category is required, ";
            }

            if(!stock) {
                errorResponse += "Stock is required, ";
            }

           
        } else if (isNaN(stock) || isNaN(price)) {
            if(isNaN(stock)) {
                errorResponse += "Stock must be a number, ";
            }

            if(isNaN(price)) {
                errorResponse += "Price must be a number, ";
            }
        } else if (stock <= 0 || price <= 0) {
            if(stock <= 0) {
                errorResponse += "Stock must be a positive number, ";
            }
            if(price <= 0) {
                errorResponse += "Price must be a positive number, ";
            }
        }

        if(errorResponse) {
            return res.status(400).json({
                error: errorResponse
            })
        }
        
        const product = new Product(req.body);

        const filePath = path.join(path.resolve('./'),"uploads",req.file.originalname);
        product.photo.data = fs.readFileSync(filePath);
        product.photo.contentType = req.file.mimetype

       
        product.save((err,storedProduct) => {
            if(err) {
                return res.status(400).json({
                    error: "Not able to save product in DB",
                    details: err
                })
            }
            res.status(200).json(storedProduct);
        })   
    })
}

// get a product by id
const getProduct = (req,res) => {
    req.product.photo = undefined; // exclude the photo of the product
    res.status(200).json(req.product);
}

// get the photo of a product
const getProductPhoto = (req,res,next) => {
    if(req.product.photo.data) {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

// updating a product
const updateProduct = (req,res) => {
    // multer error handling
    upload(req,res,function(err) {
        if(err instanceof multer.MulterError) {
            return res.status(400).json({
                error: "File size too large, upload a file with size less than 3 MB"
            })
        } else if(err) {
            return res.status(400).json({
                error: err
            })
        }

        // validations
        let { name, description, stock, price, category} = req.body;
        let errorResponse = "";
        if(!name || !description || !stock || !price || !category) {
            if(!name) {
                errorResponse += "Name is required, ";
            }
            if(!description) {
                errorResponse += "Description is required, ";
            }
            if(!price) {
                errorResponse += "Price is required, ";
            }
            if(!stock) {
                errorResponse += "Stock is required, ";
            }
            if(!category) {
                errorResponse += "Category is required, ";
            }
        } else if (isNaN(stock) || isNaN(price)) {
            if(isNaN(stock)) {
                errorResponse += "Stock must be a number, ";
            }

            if(isNaN(price)) {
                errorResponse += "Price must be a number, ";
            }
        } else if (stock <= 0 || price <= 0) {
            if(stock <= 0) {
                errorResponse += "Stock must be a positive number, ";
            }
            if(price <= 0) {
                errorResponse += "Price must be a positive number, ";
            }
        }

        if(errorResponse) {
            return res.status(400).json({
                error: errorResponse
            })
        }
        
        let product = req.product;
         _.assignIn(product,req.body);


        if(req.file) {
            const filePath = path.join(path.resolve('./'),"uploads",req.file.originalname);
            product.photo.data = fs.readFileSync(filePath);
            product.photo.contentType = req.file.mimetype
        }

        product.save((err,storedProduct) => {
            if(err) {
                return res.status(400).json({
                    error: "Not able to update product in DB",
                    details: err
                })
            }
            res.status(200).json(storedProduct);
        })    
    })
}

// deleting a product from DB
const deleteProduct = (req,res) => {
    const product = req.product;

    product.remove((err,deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: `Cannot delete '${product.name}' product`,
            })
        }
        res.status(200).json({
            message: `Product '${product.name}' deleted successfully`,
        })
    })
}

// get all the products
const getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 15;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let categorySelected = req.query.category ? req.query.category : null;

    if( !categorySelected ) {
            Product.find({},{photo: 0})
            .populate("category")
            .sort({ [sortBy] : "asc"})
            .limit(limit)
            .exec((err,products) => {
            if(err || !products) {
                return res.status(400).json({
                    error: "No products found in DB",
                })
            }
            res.status(200).json(products);
        })
    }else {
            Product.find({category: categorySelected},{photo: 0})
            .populate("category")
            .sort({ [sortBy] : "asc"})
            .limit(limit)
            .exec((err,products) => {
            if(err || !products) {
                return res.status(400).json({
                    error: "No products found in DB",
                })
            }
            res.status(200).json(products);
        })
    }
    
}

// get all unique categories (NOT used)
const getAllUniqueCategories = (req,res) => {
    Product.distinct("category",(err,categories) => {
        if(err || !categories) {
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(categories);
    })
}

// const updateStock = (req,res,next) => {
//     let myOperations = req.body.order.products.map(product => {
//         return {
//             updateOne: {
//                 filter: { _id: product._id },
//                 update: { $inc: {stock: -product.count, sold: +product.count} }
//             }
//         }
//     })

//     Product.bulkWrite(myOperations,(err,products)=> {
//         if(err) {
//             return res.status(400).json({
//                 error: "Bulk operations failed"
//             })
//         }
//         next();
//     })
// }


const updateStock = (products) => {
    let myOperations = products.map(product => {
        return {
            updateOne: {
                filter: { _id: product.product }, // here product.product refers to id of the product
                update: { $inc: {stock: -product.count, sold: +product.count} }
            }
        }
    })

    Product.bulkWrite(myOperations,(err,products)=> {
        if(err) {
            return "Error while bulk operations while updating the stock"
        }
        return "stock updated successfully"
    })
}

module.exports = {
    getProductById,
    createProduct,
    getProduct,
    getProductPhoto,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories,
    updateStock
}