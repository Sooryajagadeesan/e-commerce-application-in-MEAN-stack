const User = require("../models/user");
const Order = require("../models/order");

const getUserById = (req,res,next,id) => {
    const skipThese = {salt: 0, encryptedPassword: 0, createdAt: 0, updatedAt: 0, __v: 0}
    User.findById(id,skipThese,(err,user) => {
        if(err) {
            return res.status(404).json({
                error: "User Not found in DB"
            })
        }
        req.profile = user;
        next();
    })
}

const getUser = (req,res) => {
    User.findById({_id: req.profile._id})
    .populate("purchases.order","status updated")
    .exec((err,user) => {
        if(err) {
            res.status(400).json({
                error: "Error while getting user details"
            })
        } else {
            // console.log(user.purchases[0].order)
            return res.status(200).json(user);
        }

    })
}

const updateUser = (req,res) => {
    if(!req.body.name && req.body.name === ""){
        return res.status(400).json({
            error: "Name cannot be empty"
        })
    }else if (req.body.lastname && req.body.lastname === "") {
        return res.status(400).json({
            error: "Last Name cannot be empty"
        })
    }

    User.findByIdAndUpdate(req.profile._id,{ $set : req.body},{ new: true},(err,user) => {
        if(err) {
            return res.status(400).json({
                error: "Error while updating the user"
            })
        }
        const {_id, name, lastname, email, role} = user;
        res.json({ _id, name, lastname, email, role});
    })
}


const userPurchaseList = (req,res) => {
    Order.find({ user: req.profile._id })
        .populate("user","_id name")
        .exec((err,order) => {
            if(err) {
                return res.status(400).json({
                    error: "No orders for this account"
                })
            }
            res.json(order);
        })
}

// const pushOrderIntoPurchases = (req,res,next) => {
//     let allPurchases = [];
//     req.body.order.products.forEach((product) => {
//         allPurchases.push({
//             _id: product._id,
//             name: product.name,
//             description: product.description,
//             category: product.category,
//             quantity: product.quantity,
//             amount: req.body.order.amount,
//             transactionId: req.body.order.transactionId
//         })
//     })
    
//     User.findOneAndUpdate(
//         { _id: req.profile._id },
//         { $push: {purchases: allPurchases}},
//         { new: true },
//         (err,purchases) => {
//             if(err) {
//                 return res.status(400).json({
//                     error: "Unable to add products into purchase list"
//                 })
//             }
//             next();
//         }
//     )
// }
const pushOrderIntoPurchases = (products,transactionId,userId,amount,order) => {
    let allPurchases = [];
    let allPurchasedProducts = [];

    products.forEach((product) => {
        let newProduct = {
            _id: product.product,
            name: product.name,
            quantity: product.count,
            price: product.price
        };

        allPurchasedProducts.push(newProduct);
        
    })


    allPurchases.push({
        transactionId: transactionId,
        amount: amount,
        products: allPurchasedProducts, 
        order:  order
    })


    User.findOneAndUpdate(
        { _id: userId },
        { $push: {purchases: allPurchases[0]}},
        { new: true },
        (err,purchases) => {
            if(err) {
               console.log(`ERROR\n${err}`);
            }
        }
    )
}

module.exports = {
    getUser,
    getUserById,
    updateUser,
    userPurchaseList,
    pushOrderIntoPurchases
}