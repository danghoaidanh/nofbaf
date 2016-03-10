// dependencies
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//main config
var app  = module.exports = express();
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//passport config
var Account = require('models');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// routes
app.get('/signup', function(req,res){
   res.render('form',{});
});
app.post('/signup', signupPost);
function signupPost(req,res){
   Account.register(
       new Account({firstname: req.body.firstname,lastname: req.body.lastname,username: req.body.username, password: req.body.password}),req.body.password, function(err, account){
           if (err){
               console.log(err);
               return res.render('form',{info: 'Sorry. That username already exists. Try again.'});
           } else {
               console.log(account);
               passport.authenticate('local')(req, res, function(){
                   res.redirect('/homein');
               })  ;
           }

       }
   );

}

