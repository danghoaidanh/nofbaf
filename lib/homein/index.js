var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

//app.get('/homein',
//    require('connect-ensure-login').ensureLoggedIn(),
//    function(req, res){
//        res.render('form', { user: req.user });
//    });


app.get('/homein', requireAuth, homeinFunction);

function requireAuth(req, res, next){

    // check if the user is logged in
    if(!req.isAuthenticated()){
        req.session.messages = {value: "We're sorry! Please login to view this page.", warning: true};
        res.redirect('/login');
    }
    //req.session.messageWarnings = null;
    next();

}

function homeinFunction(req,res){
    //  req.session.messages = {value: "Login successfully", warning: true};
    res.render('form', { user: req.user , message: req.session.messages});
}