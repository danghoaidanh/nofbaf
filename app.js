var express = require('express');
var app = express();

var path = require('path');

var login = require('login');
var userlist = require('user-list');
var postlist = require('post-list');
var home = require('home');
var error = require('error');
var signup = require('signup');
var homein = require('homein');


app.use(login);
app.use(userlist);
app.use(postlist);
app.use(home);
app.use(error);
app.use(signup);
app.use(homein);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 5000, function(){
    console.log('The app is running on port 5000!!');
});

