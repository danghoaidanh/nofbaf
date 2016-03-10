var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//mongoose
mongoose.connect('mongodb://localhost:27017/nofbaf');
mongoose.connection.on('open', function () {
    console.log('Connected');
});

var Account = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    date_created: {type: Date, default: Date.now}
});


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

var AccountModel = mongoose.model('Account', Account);


//find user in the DB


