const User = require('../models/user-model')
const mongoose = require('mongoose')
require('dotenv/config')

const addUser = (req, res, next) => {
    var password = req.body.password
    var cPassword = req.body.cPassword
    var username = req.body.uName
    var email = req.body.email
   
    //validation in registration
    User.findOne({ username:username }, {email:email})
        .then(user => {
            if(user){
                let errors = {};
                if (user.username === username) {
                    errors.username = "User Name already exists";
                } else {
                    errors.email = "Email already exists";
                }
                return res.status(400).json(errors);
            }
            else if(password !== cPassword){
                res.json({
                    message: "Passwords do not match"
                })
            }    
            else{
                let user = new User({
                    username,
                    password,
                    email
                })
                user.save()

                .then(response => {
                    res.json({
                        message: "NEW USER ADDED"
                    })
                })
                .catch(response => {
                    res.json({
                        message: "ERROR OCCURED"
                    })
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
}


const login = (req, res, next) => {
    var unlog = req.body.unlog
    var pwlog = req.body.pwlog

    //validation in login
    User.findOne({ username:unlog })
    .then(user => {
        if(user){
            if(pwlog === user.password){
                if("admin" === user.designation)
                    res.send('Logged in as an admin')
                else
                    res.send('Logged in as a user')   
            }
            else{
                res.send('Password incorrect')
            }
        }
        else{
            res.send('User doesnt exist')
        }
    })
}


module.exports = {
    addUser, login
}