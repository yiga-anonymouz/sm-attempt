const express = require('express')
const Router = express.Router()
const Controller = require(`../controller/controller`)

Router.get('/' , Controller.login_index)

Router.post('/' , Controller.login_post)

Router.get('/register', Controller.register_index)

Router.post('/register', Controller.register_post)

Router.get('/home', Controller.home_index)

Router.get('/profile', Controller.profile_index)

Router.get(' ', Controller.not_found)







module.exports = Router
