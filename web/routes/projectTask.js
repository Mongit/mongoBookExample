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

router.get('/specificSubdoc/:projectId/task/show/:taskId', function(req, res, next) { 
    var Project = mongoose.model('Project');
    //curl http://localhost:3000/api/projectTask/specificSubdoc/55fc2076a4d7df1f343ba5ef/task/show/55fc2076a4d7df1f343ba5f0
    Project.findById(req.params.projectId, function(err, project){
        if(!err) {
            console.log(project.task); //aray of tasks
            var thisTask = project.task.id(req.params.taskId);
            console.log('This task: ' + thisTask);//individual task document
        }     
    });
});

//when you want to edit or delete a specific subdocument, you need to know the _id of the parent document and the _id of the subdocument
router.get('/deleteSubdoc/:projectId/task/delete/:taskId', function(req, res, next) { 
    var Project = mongoose.model('Project');
    Project.findById(req.params.projectId, function(err, project){
        if(!err) {
            console.log("before deleted project.task: " + project.task);      
            var thisTask = project.task.id(req.params.taskId).remove();
            project.save(function(err, project) {
                if (err) return console.log("UPS! " + err);
                console.log("Your subdoc has been deleted successfully " + project.task);
            });
        }     
    });
});

module.exports = router;