var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var User = require('models/user');
var User2 = require('models');


//authentication by passport local: http://passportjs.org/docs/username-password

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use('login',new LocalStrategy(
    function(username, password, cb) {
        User.findUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false,{message: "Login failed! Please make sure your email is correct!"});
            }
            if (user.password != password) { return cb(null, false,{message: "Login failed! Please make sure your password is correct!"}); }
            return cb(null, user);
        });
    }));

///////////////////////////////////////////////
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var app = module.exports = express();


app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



app.post('/login', loginPost);

function loginPost(req, res, next) {
    // ask passport to authenticate
    passport.authenticate('login', function(err, user, info) {
        if (err) {
            // if error happens
            return next(err);
        }

        if (!user) {
            // if authentication fail, get the error message that we set
            // from previous (info.message) step, assign it into to
            // req.session and redirect to the login page again to display
            req.session.messages = {value: info.message, warning: true};
            return res.redirect('/login');
        }

        // if everything's OK
        req.logIn(user, function(err) {
            if (err) {
                req.session.messages = {value: "Error", warning: true};
                return next(err);
            }

            // set the message
            req.session.messages = {value: "Login successfully", warning: false};
            return res.redirect('/homein');
        });

    })(req, res, next);
}

app.get('/login', loginGet);

function loginGet(req,res){
    if(req.user){
        res.redirect('/homein');
    }else {
        res.render('form',{message: req.session.messages });
        //req.session.messages={value: "clear me", warning: "null1"};
        delete  req.session.messages;
       // req.session.messages = {value: null, warning: null};
      //delete  req.session.messageWarnings;
    }


}

//app.get('/login', function (req, res) {
//    res.render('form');
//});

app.get('/logout', function(req, res){
    req.logout();
    req.session.messages = {value: "Your friends are waiting for your coming back!", warning: false};
    res.redirect('/login');
   // req.session.messages = {};
});

