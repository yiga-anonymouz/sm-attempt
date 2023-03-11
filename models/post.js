const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: String,
    date: new Date(),
    likes: Number,
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "profiles"
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const Posts = new mongoose.model('posts', postSchema)

module.exports = Posts