var mongoose = require('mongoose');

var teenSchema = mongoose.Schema({
    age: {type: Number, min: 13, max: 19}
});

var TeenSchema = mongoose.model('Number', teenSchema);

module.exports = function(config) {
    return new TeenSchema(config);
};