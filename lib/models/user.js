var Account = require('models');

exports.findUsername = function (username, done) {

    Account.findOne({username: username}, function (err,
                                                    docs) {
        console.log('error is here: ');
        console.log(err);
        console.log('result is here: ');
        console.log(docs);    // => 2
        if (docs != null) {
            console.log('passed');
            return done(null, docs);
        }
        return done(null, null);
    });

};


exports.findById = function (_id, done) {
    Account.findOne({_id: _id}, function (err, docs) {
        //mongoose.connection.close();
        if (docs != null) {
            return done(null, docs._id);
        }
        return done(null, null);
    });
};