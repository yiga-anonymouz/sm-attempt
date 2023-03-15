const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    like: followers,
    posts: Number,
    following: String
})

const account = new mongoose.model('accountdetail', accountSchema)

module.exports = account