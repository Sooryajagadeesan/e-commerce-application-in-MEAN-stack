const express= require("express");
const router = express.Router();

const { makePayment } = require("../controllers/stripePayment");

// stripe payment route
router.post('/stripepayment', makePayment)



module.exports = router;