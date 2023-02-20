const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password, gender, age, city } = req.body;
    try {
        const userAlready = await userModel.findOne({ email });
        if (userAlready) {
            res.send({ "msg": "User is already registered" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send({ "msg": "put valid credentials" });
                } else {
                    const user = new userModel({ name, email, gender, age, city, password: hash });
                    user.save();
                    res.send({ "msg": "User has been registered" });
                }
            });
        }
    } catch (error) {

    }

});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function(err, result){
                if (result) {
                    var token = jwt.sign({ user: user[0]._id }, 'post', { expiresIn: '4h' });
                    res.send({ "msg": "user login successful", "token": token });
                } else {
                    res.send({ "msg": "wrong credential or password","err":err });
                }
            });
        } else {
            res.send({ "msg": "wrong credential or email" });
        }
    } catch (error) {
        res.send({ "msg": error.message });
    }
})

module.exports = {
    userRouter
}