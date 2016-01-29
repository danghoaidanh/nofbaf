var express = require('express');
var app = module.exports = express();
var user = require('users');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/users', function(req,res){
  user.all(function(err, users){

    //res.send(users);
    res.render('form', { results: JSON.stringify(users)});
    });
});

