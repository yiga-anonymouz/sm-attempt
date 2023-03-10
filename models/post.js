const mongoose = require('mongoose')
const express = require('express')

const postSchema = new mongoose.Schema({
    caption: String,
    image: String,
    date: new Date,
    likes: String
})

const Posts = new mongoose.model('posts', postSchema)

module.exports = Posts