/* CUSTOM VALIDATION
If you only need one piece of validation for a given data item, you can simply specify a function and return true if the validation is passed, and false if it fails. For example, if we want our usernames to be at least five characters long, we can create a function like the following:*/
var mongoose = require('mongoose');

var lengthValidator = function(val) {
    if (val && val.length >= 5) {
        return true;
    }
    return false;
};
    
var userSchema = mongoose.Schema({
    name: {type: String,
          required: true,
          validate: {validator: lengthValidator, msg: "Name too short"}//custom message
          },
    email: {type: String, required: true, unique: true}
});

var User = mongoose.model('User2', userSchema);

module.exports = function(config) {
    return new User(config);
};
