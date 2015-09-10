var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var personSchema = Schema({
    name: String,
    age: Number,
    stories: [{//field that sets an array of objectIds
        type: Schema.Types.ObjectId,
        ref: 'Story'//ref option: tells Mongoose which model to use during the population('Story' model)
    }]
});

var Person = mongoose.model('Person', personSchema);

module.exports = function(config) {
    return new Person(config);
};
