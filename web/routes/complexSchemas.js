var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var personFactory = require('./../schemas/ch10/person'); 
var storyFactory = require('./../schemas/ch10/story'); 


router.get('/population', function(req, res, next) {
    //$curl http://localhost:3000/api/complexSchemas/population
    var Story = mongoose.model('Story');
//You build a query, use the populate command, and then exec() when ready. This will populate with the entire user object.     
    Story
    .findOne({ title: 'Once upon a timex.' })
    .populate('_creator')
    .exec(function (err, story) {
        if (err) return next(err);
        console.log(story);
        console.log('The creator is %s', story._creator.name);
        //prints 'The creator is Aaron'    
    });
    
});

router.get('/population2', function(req, res, next) {
    //$curl http://localhost:3000/api/complexSchemas/population
    var Story = mongoose.model('Story');
//we can specify the individual paths that we require. In this case: name and age
    Story
    .findOne({ title: 'Once upon a timex.' })
    .populate('_creator', 'name age')
    .exec(function (err, story) {
        if (err) return next(err);
        console.log(story);
        console.log('The creator is %s', story._creator.name);
        //prints 'The creator is Aaron'    
    });
    
});

router.post('/population', function(req, res, next) {
    //$ curl -i -H "Content-Type: application/json" -d  '{"name":"laura", "age": 12}' http://localhost:3000/api/complexSchemas/population
    var aaron = personFactory({
        name: req.body.name, 
        age: req.body.age
    });
    
    aaron.save(function (err, person) {
        if(err) return console.log(err);
        
        console.log(person);
        console.log("persona guardada");
        
        var story1 = storyFactory({
            title: "mi titulo2", 
            _creator: aaron._id //assing the _id from the person
        });
        
        story1.save(function (err, story) {
            if(err) return console.log(err);
            
            console.log(story);
            console.log('Story guardada y en _creator va el _id de person');
            //that's it!
        });
    });
});

module.exports = router;
