const mongoose = require('mongoose')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')


const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

UserSchema.plugin(passportLocalMongoose)

const User = new mongoose.model('profile', UserSchema)

passport.use(User.createStrategy())

module.exports = User