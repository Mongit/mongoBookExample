var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var project = require('./../schemas/ch10/projectTaskSchema');

router.post('/projectSave', function(req, res, next) { 
    var Project = mongoose.model('Project');
    
    Project.create({
        projectName: req.body.projectName,
        task: [{
            taskName: 'comida',
            taskDesc: 'Hacer la comida'
        },
        {
            taskName: 'limpiar',
            taskDesc: 'barrer y trapear'
        }]
    }, function(err, project) {
        if(err) return console.log("Oh oh, " + err);
        
        console.log("Your project is saved: "+ project);
    });
});

module.exports = router;