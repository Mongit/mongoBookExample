var mongoose = require('mongoose');

var lengthValidator = function(val) {
    if (val && val.length >= 5) {
        return true;
    }
    return false;
};

var validateLength = [lengthValidator, 'Name too short'];

var exampleSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        validate: validateLength
    },
    email: {
        type: String,
        required: true,
        unique: true            
    }
});

var Example = mongoose.model('Example', exampleSchema);
        
module.exports = function(config) {
    return new Example(config);
};