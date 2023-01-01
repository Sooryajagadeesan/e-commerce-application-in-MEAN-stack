require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')

// importing route definitions from routes module
const authenticationRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripePayment");

const stripeWebhook = require("./routes/stripeWebhook");

// const { insertMany } = require('./models/user');

// DB connection
mongoose.connect(process.env.DATABASE, { maxPoolSize: 200})
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log(`Error while connecting to DB,\n ${err}`));

// creating a stream to write logs into a file
let accessLogStream = fs.createWriteStream(path.join(path.resolve("./"), 'logs','app.log'), { flags: 'a' })

const app = express();

// port to listen
const port = process.env.PORT || 5000;

app.use("/api",stripeWebhook);

// using middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny', { stream: accessLogStream }))


// all routes
app.use("/api",authenticationRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);

// starting the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})


