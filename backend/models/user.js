const mongoose = require("mongoose");
const crypto = require('crypto'); // for encrypting the plain password
const { v4: uuidv4 } = require('uuid'); // for generating salt for each user


// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40,
        trim: true
    },
    encryptedPassword: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: [{
        amount: Number,
        transactionId: String,
        order: {
            type: mongoose.ObjectId,
            ref: "Order"
        },
        products: {
            type: Array,
            default: []
        }
    }]
},{
    timestamps: true
})

// virtual to set the value of 'salt' field, 'encryptedPassword' field and to get the plain password if needed
userSchema.virtual("password")
    .set(function(plainPassword) {
        this._password = plainPassword;
        this.salt = uuidv4();
        this.encryptedPassword = this.securePassword(plainPassword);
    })
    .get(function() {
        return this._password;
    })

// instance methods for the schema, it returns encrypted password to be stored in DB
userSchema.methods.securePassword = function(plainPassword) {
        // if no password, return "" so that DB can throw error.
        if(!plainPassword) {
            return "";
        }

        try {
            return crypto.createHmac('sha256', this.salt)
                   .update(plainPassword)
                   .digest('hex');
        }catch(err) {
            return "";
        }
}

// authenticate method to check whether the entered password (during sign in) is same as stored password
userSchema.methods.authenticate = function(enteredPassword) {
    return this.securePassword(enteredPassword) == this.encryptedPassword;
}

module.exports = mongoose.model("User",userSchema);