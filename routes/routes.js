const express = require('express')
const Router = express.Router()
const Controller = require(`../controller/controller`)


Router.get('/login' , Controller.login_index)

Router.post('/' , Controller.login_post)

Router.get('/register', Controller.register_index)

Router.post('/register', Controller.register_post)

Router.get('/', Controller.home_index)

Router.get('/profile', Controller.profile_index)

Router.get('/new-post', Controller.post_index)

Router.post('/new-post', Controller.upload.single('image') , Controller.post_post)

Router.get('/messages', Controller.messages_index)

Router.get('/logout', Controller.logout)

Router.get(Controller.not_found)







module.exports = Router
