const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken'); // to generate jwt
const expressJwt = require('express-jwt'); // to validate jwt

// sign up
const signup = (req,res) => {
    const user = new User(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    user.save((err,storedUser) => {
        if(err) {
            res.status(400)
                .json({
                    "error": err,
                    "details": "Not able to store user in DB"
                })
        }else {
            res.json({
                name: storedUser.name,
                email: storedUser.email,
                id: storedUser._id
            });
        }
    })
}

// sign in
const signin = (req,res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }


    User.findOne({ email },(err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Email does not exist, Please sign Up First"
            })
        }
        
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password does not match"
            })
        }

        const token = jwt.sign({ _id : user._id }, process.env.TOKEN_SECRET,{ expiresIn: "1d"});
        // res.cookie("token",token,{ expire: new Date() + 9999});

        const {_id, name, lastname, role} = user;
        return res.status(200).json({
            token,
            user: { name, lastname, email, _id, role }
        })

    })
}

// sign out
const signout = (req,res) => {
    // res.clearCookie("token");  
    res.status(200).json({
        message: "Sign out Successful"
    }) 
}

// is signed in ? checker, built-in middleware provided by express-jwt module
const isSignedIn = expressJwt({
    secret: process.env.TOKEN_SECRET, 
    algorithms: ['HS256'],
    userProperty: "auth"
})

// is Authenticated ? checker
const isAuthenticated = (req,res,next) => {
    const checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

// is Admin ? checker 
const isAdmin = (req,res,next) => {
    // normal user role is 0
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not an admin, access denied"
        })
    }
    next();
}



module.exports = {
    signup,
    signin,
    signout,
    isSignedIn,
    isAuthenticated,
    isAdmin
}


