var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true, unique: true}
});

var UserSchema = mongoose.model('User', userSchema);

module.exports = function(config) {
    return new UserSchema(config);
};