const mongoose = require('mongoose')
const Schema = mongoose.Schema
//user database
const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    designation: {
        type: String,
        default: "user"
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User