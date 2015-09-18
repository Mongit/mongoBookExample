var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//subdocuments are documents that are stored within a parent document, instead of a MongoDB collection of their own.
var taskSchema = Schema({
    taskName: {type: String, required: true},
    taskDesc: String,
    createdOn: {type: Date, default: Date.now}   
});

var projectSchema = Schema({
    projectName: String,
    task: [taskSchema]//Subdocument stored within a parent document
});

var Project = mongoose.model("Project", projectSchema);

module.exports = function(config) {
    return new Project(config);
};