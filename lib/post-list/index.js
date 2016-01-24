var express = require('express');
var app = module.exports = express();
var postapi = require('post-api');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/post', function(req,res){
   postapi.all(function(err, posts){
       res.render('form',{posts: JSON.stringify(posts)}  );
   }) ;
});