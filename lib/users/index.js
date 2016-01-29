exports.all = function (fn) {
    fn(null,[
        { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
        , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
    ]);
}

var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
    , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, done) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            done(null, records[idx]);
        } else {
            done(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = function(username, done) {
    process.nextTick(function() {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return done(null, record);
            }
        }
        return done(null, null);
    });
}

