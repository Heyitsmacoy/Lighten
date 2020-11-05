const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
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

//hashing password
userSchema.pre('save', async function (next){
    try{ 
        const salt = await bcrypt.genSalt(10)
        const hashed_pass = await bcrypt.hash(this.password, salt)
        this.password = hashed_pass
        next()
    }
    catch(error){
        next(error)
    }
})


const User = mongoose.model('User', userSchema)
module.exports = User