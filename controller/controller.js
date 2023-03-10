const ejs = require('ejs')
const Users = require('../models/models')
const Posts = require('../models/post')
const passport = require('passport')
const fs = require('fs');
const path = require('path');
const passportLocalMongoose = require('passport-local-mongoose')
const uniRl = require('url')
const multer = require('multer');
 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
})

const upload = multer({storage: storage})

passport.serializeUser((Users, done) => {
    done(null, Users.id);
  });
  
  //ASYNC ALL THE THINGS!!
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await Users.findById(id);
      if (!user) {
        return done(new Error('user not found'));
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  });


const login_index = (req, res) => {
    res.render('login')
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


const register_index = (req, res) => {
    res.render('register')
}

const home_index = (req, res) => {
    if(req.isAuthenticated()){
        Posts.find({'id': 1})
        .then((post) => {
            res.render('home', {post: post})
        }).catch((err) => {
            console.log(err);
            res.status(500).send('An error occurred', err)
        })
    }else{
       res.render('login')
    }
}

const profile_index = (req, res) => {

    if(req.isAuthenticated()){
        const protocol = req.protocol;
        const host = req.hostname;
        const url = req.originalUrl;
        const port = process.env.PORT || PORT;
    
        const fullUrl = `${protocol}://${host}:${port}${url}`
    
        const q = uniRl.parse(fullUrl , true)
        const qdata = q.query
    
        console.log(qdata)
        res.render('profile', {data: qdata})
    }else{
        res.redirect('/')
    }
   
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


const post_index = (req, res) => {
    if(req.isAuthenticated()){
        res.render('post')
    }else{
        res.redirect('/')
    }
}

const post_post =  (req, res, next) => {
            console.log(req.body.caption);
            const postData = {
                caption: req.body.caption,
                image: {
                    data: fs.readFileSync(path.join(`${__dirname}/../uploads/${req.file.filename}`)),
                    contentType: 'image/png'
                }
            }
            Posts.create(postData)
                .then((item) =>{
                    item.save()
                    res.redirect('/profile');
                }).catch((err) => {
                    console.log(err);
                })
                
};

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
    post_index,
    post_post,
    not_found,
    upload
}