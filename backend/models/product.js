const mongoose = require("mongoose");

// product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 2000,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        maxlength: 32,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        // required: true
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    // photo is a javascript object that holds a data key of value type buffer and a contentType key of value type string
    photo: {
        data: Buffer,
        contentType: String
    }
},{
    timestamps: true
})

// exporting the model
module.exports = mongoose.model("Product",productSchema);