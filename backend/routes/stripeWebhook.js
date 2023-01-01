const express = require("express");
const { append } = require("express/lib/response");
const { accessWebHook } = require("../controllers/stripeWebhooks");
const bodyParser = require("body-parser");

const router = express.Router();


// stripe webhook router, to store the order after payment
router.post('/webhook', bodyParser.raw({type: 'application/json'}),accessWebHook);


module.exports = router;