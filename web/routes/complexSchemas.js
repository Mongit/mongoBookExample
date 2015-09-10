var express = require('express');
var router = express.Router();
var personFactory = require('./../schemas/ch10/person'); 
var storyFactory = require('./../schemas/ch10/story'); 


router.get('/population', function(req, res, next) {
    res.send('index');
});


router.post('/population', function(req, res, next) {  
    var person = personFactory({ 
        _id: req.body._id,
        name: req.body.name,
        age: req.body.age
    });
    
    person.save(function (err) {
        if(err) return next(err);
        
        var story1 = storyFactory({
            title: req.body.title,
            _creator: req.body._id //assign the _id from the person
        });
        
        story1.save(function (err) {
            if(err) next(err);
            //that's it!
        });
    });
    res.json({success: true});
});
/*

router.post('/population', function(req, res, next) {
    var body = {
        _id: 0, name: 'Aaron', age: 100, title: "Once upon a timex.", _creator: 0
    };
    var aaron = populationFactory(body).person({
        //_id: 0, name: 'Aaron', age: 100
        _id: 0, name: 'Aaron', age: 100
        
    });
    
    aaron.save(function (err) {
        if(err) return next(err);
        
        var story1 = populationFactory.story({
            //title: "Once upon a timex.", _creator: aaron._id //assing the _id from the person
            
        });
        
        story1.save(function (err) {
            if(err) next(err);
            //that's it!
        });
    });
    
    console.dir(aaron);
    console.dir(story1);
    res.json({success: true});
});
*/
module.exports = router;
