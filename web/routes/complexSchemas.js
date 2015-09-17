var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var personFactory = require('./../schemas/ch10/person'); 
var storyFactory = require('./../schemas/ch10/story'); 


router.get('/getAllPersons', function(req, res, next) {
    var Person = mongoose.model('Person');
    
    Person.find(function (err, persons) {
        if (err) return next(err);
        console.log(persons);
    });
    
});
router.get('/getAllStories', function(req, res, next) {
    var Story = mongoose.model('Story');
    
    Story.find(function (err, stories) {
        if (err) return next(err);
        console.log(stories);
    });
    
});

router.get('/populatieMethod', function(req, res, next) {
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

router.get('/getSpecificPaths', function(req, res, next) {
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

router.post('/nuevaPerson', function(req, res, next) {   
    var aaron = personFactory({ name: req.body.name, age: req.body.age });
        
    aaron.save(function (err, person) {
        if(err) return console.log(err);
        
        console.log(person);
        console.log("persona guardada");
    });
});

router.post('/creaGuardaStory/:id', function(req, res, next) {
    //curl -i -H "Content-Type: application/json" -d '{"title": "Juana title"}' http://localhost:3000/api/complexSchemas/story/55f6ec335d16fcf30391a9d6
    var Person = mongoose.model('Person');
    var id = req.params.id;
    
    Person.findById(id, function (err, found) {
        if (err) return console.log('OH DEAR... ' + err);
        
        var story1 = storyFactory({ 
            title: req.body.title, 
            _creator: id });
    
        story1.fans.push(found);

        story1.save(function (err, story) {
            if(err) return console.log(err);    
                console.log(story);
                console.log('Story guardada y en _creator va el _id de person');
        });
        
        found.stories.push(story1);
        found.save(function(err, per) {
            if(err)  return console.log(err);
            console.log("Story en persona guardada " + per);
        });
        
    });
});

router.get('/queryingAndOptions', function(req, res, next) {
/*
populate fans array based on their age, select just their names, return at most 5 of them
    path: Is he path to populate. Is required.
    match: Specify query conditions.
    select: String/object specifying which paths to return.
    options: Specify query options.
*/
    var Story = mongoose.model('Story');
    //SOLO CON ARRAYS
    Story
    .find('jonas')
    .populate({
        path: 'fans',
        match: { age: { $gte: 21 }},//$gte selects the documents where the value of the 'age' is greater than or equal to (>=) 21. 
        select: 'name -_id',//-_id elimina el id de la vista
        options: { limit: 1 }//numero de objs en array?
    })
    .exec(function (err, story) {
        if (err) return next(err);
        console.log(story);
    });
    
});

router.get('/refsToChildren', function(req, res, next) {
    var Person = mongoose.model('Person');
    
    Person
    .findOne({ name: 'Juana' })
    .populate('stories')
    .exec(function (err, person) {
        if(err) return console.log(err);
        console.log(person);
    });
});

router.get('/findStories/:id', function(req, res, next) {//person id
    //we could skip populating and directly find() the stories we are interested in.
    var Story = mongoose.model('Story');
    
    Story
    .find({ _creator: req.params.id })
    .exec(function(err, stories) {
        if(err) return console.log(err);
        console.log('The stories are an array: ', stories);
        //var thisStory = stories.id(55f6ec335d16fcf30391a9d6);
        //console.log(thisStory);
    });
});

router.get('/updatingRefs/:id', function(req, res, next) {    
    //If we realized that the _creator of our story was incorrect we updated like this
    var Story = mongoose.model('Story');
    var story = undefined;
    
    Story
    .find({ _creator: req.params.id })
    .exec(function(err, stories) {
        if(err) return console.log(err);
        story = stories[0];
        console.log('The story: ', story);
   
        var guille = personFactory({ name: 'Guillermo', age: 19 });
        guille.save(function (err) {
            if(err) return console.log(err);

            story._creator = guille;
            console.log("The new creator " + story._creator.name);

            story.save(function(err) {
                if(err) return console.log(err);

                Story
                .findOne({title: /juana title/i })
                .populate({ path: '_creator', select: 'name' })
                .exec(function (err, story) {
                    if(err) return console.log(err);

                    console.log('The creator is %s', story._creator.name);
                })
            });
        });
        
    });
});


router.get('/getOne/:id', function(req, res, next) {//id de la story
//curl http://localhost:3000/api/complexSchemas/getOne/55f6ecda24e5e61c0548a9fc

    var Story = mongoose.model('Story');

    Story
    .findOne({ _id: req.params.id })
    .populate('_creator')
    .exec(function (err, story) {
        if (err) return console.log("Oh you poor thing" + err);
        console.log(story);
        console.log('The creator is %s', story);  
    });
    
});

module.exports = router;
