var express = require('express');
var app = module.exports = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/homein',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('form', { user: req.user });
    });