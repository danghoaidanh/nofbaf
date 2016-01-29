var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var User = require('users');


//authentication by passport local: http://passportjs.org/docs/username-password

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, cb) {
        User.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false,{message: "Incorrect username."});
            }
            if (user.password != password) { return cb(null, false,{message: 'Incorrect password.'}); }
            return cb(null, user);
        });
    }));

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



app.post('/login', passport.authenticate('local', {
    successRedirect: '/homein',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/login', function (req, res) {
    res.render('form');
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

