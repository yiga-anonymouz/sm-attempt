const ejs = require('ejs')
const Users = require('../models/models')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const uniRl = require('url')


passport.serializeUser(function(Users, done) {
    done(null, Users.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function (err, Users) {
      done(err, Users);
    });
  });


const login_index = (req, res) => {
    res.render('login')
}

const register_index = (req, res) => {
    res.render('register')
}

const home_index = (req, res) => {
    if(req.isAuthenticated()){
        console.log(req)
        res.render('home')
    }else{
        res.redirect('/')
    }
}

const profile_index = (req, res) => {

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.PORT || PORT;

    const fullUrl = `${protocol}://${host}:${port}${url}`

    const q = uniRl.parse(fullUrl , true)
    const qdata = q.query

    console.log(qdata)
    res.render('profile', {data: qdata})
}

const register_post = (req , res) => {
    Users.register({username: req.body.username}, req.body.password, function(err, user) {
        if(err){
            console.log(err)
            res.redirect('/register')
        }else{
            passport.authenticate('local') (req, res, () => {
                res.redirect('/home')
            })
        }
    })
}

const login_post = (req, res) => {
    const user = new Users({
        email: req.body.username,
        password: req.body.password
    })
    req.login(user , (err) => {
        if(err){
            console.log(err)
        }else{
            passport.authenticate('local')(req, res, () => {
                res.render('home', {username: user.email})
            })
        }
    } )
}

const not_found = (req, res) => {
    res.send('GO BACK MF')
}


module.exports = {
    login_index,
    register_index,
    home_index,
    profile_index,
    register_post,
    login_post,
    not_found
}