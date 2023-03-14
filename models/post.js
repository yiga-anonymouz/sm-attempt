const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: String,
    date: Date,
    likes: Number,
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles',
      },
    image: {
        data: Buffer,
        contentType: String
    }
})

const Posts = new mongoose.model('post', postSchema)

module.exports = Posts