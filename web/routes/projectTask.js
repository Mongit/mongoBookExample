var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var project = require('./../schemas/ch10/projectTaskSchema');

router.get('/getAllProjects', function(req, res, next) { 
    var Project = mongoose.model('Project');
    
    Project.find(function(err, projects) {
        if(err) return console.log("Oh oh, " + err);
        console.log("Your projects are: "+ projects);
    });
});

router.get('/getAllSubdoc', function(req, res, next) { 
    var Project = mongoose.model('Project');
    
    Project.find(function(err, projects) {
        if(err) return console.log("Oh oh, " + err);
        //console.log("Your projects are: "+ projects);
       
        projects.forEach(function(obj){
            console.log(obj.task);
        });
        
    });
});

router.post('/projectSave', function(req, res, next) { 
    var Project = mongoose.model('Project');
    
    Project.create({projectName: req.body.projectName}, 
                   function(err, project) {
        if(err) return console.log("Oh oh, " + err);
        console.log("Your project is saved: "+ project);
    });
});

router.get('/addTask/:projectId', function(req, res, next) { 
    var Project = mongoose.model('Project');
    
    Project.findById(req.params.projectId, 'task createdOn', function(err, project){
        if(!err) {
            project.task.push({
                taskName: 'Ejercicio',
                taskDesc: 'Hacer aerobics'
            });
            project.save(function(err, project) {
            if(err) console.log('Oh dear ', err)
            
            console.log('Task saved: ' + project);
            });
        }
   });
});

module.exports = router;