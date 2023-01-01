const Category = require("../models/category");

// populate req.category
const getCategoryById = (req,res,next,id) => {
    Category.findById(id, (err,category)=> {
        if(err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = category;
        next();
    })
}

// create a category
const createCategory = (req,res) => {
    const category = new Category(req.body);
    // validations 
    let { name } = req.body;

    if(!name) {
        return res.status(400).json({
            error: "Name is required for creating a category"
        })
    }

    category.save((err,storedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({ category : storedCategory });
    })
}

// get category (NOT used)
const getCategory = (req,res) => {
    res.status(200).json(req.category);
}

// get all categories
const getAllCategories = (req,res) => {
    Category.find({},(err,categories) => {
        if(err) {
            return res.status(400).json({
                error: "No categories found in DB"
            })
        }
        res.json(categories)
    })
}

// update category
const updateCategory = (req,res) => {
    const category = req.category;

    // validations
    let {name} = req.body;
    if(!name) {
        return res.status(400).json({
            error: "Name is required to update a category"
        })
    }

    category.name = req.body.name;

    category.save((err,storedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Error while updating category"
            })
        }
        res.json({message: storedCategory});
    })
}

// delete category
const deleteCategory = (req,res) => {
    const category = req.category;
    if (!category){
        return res.status(400).json({
            error: "NO such category to delete"
        })
    }
    category.remove((err,deletedCategory) => {
        if(err) {
            return res.status(400).json({
                error: `Failed to delete '${category.name}' category`
            })
        }
        res.json({
            message: `Category '${category.name}' successfully deleted`
        })
    });
}

// exports
module.exports = {
    getCategoryById,
    createCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}