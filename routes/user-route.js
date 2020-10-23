//declaration
const express = require('express');
const app = express();
const path = require('path')
const router = express.Router()

//views
const userController = require('../controller/user-controller')

//routes
router.get('/', (req, res) => {
    res.render("index.ejs")
})
router.get('/forgotPassword', (req, res) => {
    res.render("fpw.ejs")
})
router.get('/terms&policy', (req, res) => {
    res.render("terms.ejs")
})

router.post('/register', userController.addUser)
router.post('/login', userController.login)

module.exports = router