const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const expressLayouts = require('express-ejs-layouts');

require('dotenv/config')//online db
const userRoute = require('./routes/user-route')

//database connection
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true}, () => {
        console.log('Running...')
    })

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//check port
app.listen(PORT, console.log(`Server running on port ${PORT}`))
app.use('/users', userRoute)

//routes
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))
app.use(express.static(path.join(__dirname, '/public')))