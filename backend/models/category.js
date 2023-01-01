const mongoose = require("mongoose");

// category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

// exporting the model
module.exports = mongoose.model("Category",categorySchema);