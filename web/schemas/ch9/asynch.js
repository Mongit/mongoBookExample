var mongoose = require('mongoose');

var usernameSchema = mongoose.Schema({
    username: String,
});

var Username = mongoose.model('Username', usernameSchema);

//----------------------------------------------------------
usernameSchema.path('username').validate(function (value, respond) {
    Username.find({username: value}, function(err, users) {
        if (err) {
            console.log(err);
            return respond(false);
        }
        console.log('Number found: ' + users.length);
        if(users.length) {
            respond(false);//validation failed
        } else {
            respond(true); //validation passed
        }
    })
}, 'Duplicate username');

//----------------------------------------------------------

module.exports = function(config) {
    return new Username(config);
};
