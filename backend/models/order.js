const mongoose = require("mongoose");

// Schema for all products when the products are inside a cart
const productCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

// order schema
const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transactionId: String,
    amount: Number,
    address: {
        type: String,
        maxlength: 2000,
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date,
    user: {
        type: mongoose.ObjectId,
        ref: "User"
    }
    
},{
    timestamps: true
})

// for exporting
const Order = mongoose.model("Order",orderSchema);
const ProductCart = mongoose.model("ProductCart",productCartSchema);

module.exports = {Order, ProductCart}

