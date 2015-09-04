/*
    match: This validator is for matching against a regular expression
    enum: This validator is for checking against a provided list of possible             values
*/
var mongoose = require('mongoose');

/*
var weekdaySchema = mongoose.Schema({
    day: {
        type: String,
        match:/^(mon|tues|wednes|thurs|fri)day$/i
    }
});
*/
var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']; 

var weekdaySchema = mongoose.Schema({
    day: {
        type: String, 
        enum: weekdays
    }
});

var Weekdays = mongoose.model('Weekdays', weekdaySchema);

module.exports = function(config) {
    return new Weekdays(config);
};