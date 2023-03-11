require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const router = require('./routes/routes')

const PORT = process.env.PORT

mongoose.connect('mongodb://localhost:27017/smDB', {useNewUrlParser: true})

const app = express()

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())




app.use(router)

app.listen(PORT, () => {
    console.log('Server Started')
})