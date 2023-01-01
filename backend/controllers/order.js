const res = require("express/lib/response");
const { Order } = require("../models/order");

// populate req.order
const getOrderById = (req,res,next,id) => {
    Order.findById(id)
        .populate("products.product","name price")
        .exec((err,order) => {
            if(err) {
                return res.status(400).json({
                    error: "No order found in DB"
                })
            }
            req.order = order;
            next();
        })
}

// const createOrder = (req,res) => {
//     req.body.order.user = req.profile;

//     const order = new Order(req.body.order);
//     order.save((err,storedOrder) => {
//         if(err) {
//             return res.status(400).json({
//                 error: "Failed to save order in DB"
//             })
//         }
//         res.json(storedOrder)
//     })
// }

// get all orders
const getAllOrders = (req,res) => {
    Order.find()
        .populate("user","_id name email")
        .exec((err,orders) => {
            if(err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                })
            }
            res.json(orders);
        })
}

// get all order of a user, (NOT used, alternative to fetch order details from purchases of user)
const getAllOrdersOfUser = (req,res) => {
    Order.find({user: req.profile._id})
        .populate("user","_id name lastname email")
        .exec((err,orders) => {
            if(err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                })
            }
            res.json(orders);
        })
}

// update the status of order
const updateStatus = (req,res) => {

    // validations

    let { status } = req.body;

    if(!status) {
        return res.status(400).json({
            error: "Status value is required for updating"
        })
    }

    Order.updateOne(
        {_id: req.order._id},
        {
            $set: {
                status: req.body.status
            }
        },
        (err,order) => {
            if(err) {
                return res.status(400).json({
                    error: "Not able to update status of order"
                })
            }
            res.json(order);
        }
        
    )
}

// get order status (NOT used)
const getOrderStatus = (req,res) => {
    res.json(Order.schema.path("status").enumValues);
}

//  create order function
const createOrder = async (orderInfo) => {
    const order = new Order(orderInfo);
    // all validations
    let {products,transactionId,amount,address,user,updated} = orderInfo;

    if(!products.length || !transactionId || !amount || !address || !user || !updated) {
        let errorResponse = "";

        if(!products.length) {
            errorResponse += "Products cannot be empty, ";
        }
        if(!transactionId) {
            errorResponse += "TransactionId cannot be empty, ";
        }
        if(!amount) {
            errorResponse += "Amount cannot be empty, ";
        }
        if(!address) {
            errorResponse += "Address cannot be empty, ";
        }
        if(!user) {
            errorResponse += "User details cannot be empty, ";
        }
        if(!updated) {
            errorResponse += "Updated Date cannot be empty, ";
        }

        return ({
            error: errorResponse
        })
    }

    // returning a promise to get control on the stripe webhook 
    let savedOrder = await order.save()
    return savedOrder
    
}



module.exports = {
    getOrderById,
    createOrder,
    getAllOrders,
    updateStatus,
    getOrderStatus,
    getAllOrdersOfUser
}