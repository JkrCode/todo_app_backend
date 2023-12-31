const express = require('express');
const user_router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const passport = require('passport');


user_router.post("/user/register", async (req, res)=>{
    try {
            const user = await User.findOne({username: req.body.username});
        if (user == null){
            const hashedPassword =await bcrypt.hash(req.body.password, 10)
            const newUser = new User({username: req.body.username, password: hashedPassword});
            await newUser.save();
            res.sendStatus(201);
        } else {
            res.send("user already exists")
        }
    } catch(err){
        throw (err)
    }
})
    
user_router.post("/user/login", async (req, res, next) => {
    try {
        passport.authenticate("local", async (err, user, info) => {
            try {
                if (err) throw err;
                if (!user) return res.send("No such user exists");

                req.login(user, async (err) => {
                    try {
                        if (err) throw err;
                        res.send({
                            message: "Successfully authenticated",
                            
                    });
                    } catch (err) {
                        throw err;
                    }
                });
            } catch (err) {
                throw err;
            }
        })(req, res, next);
    } catch (err) {
        console.log(err)
        throw err;
        
    } 
});


module.exports = user_router;

