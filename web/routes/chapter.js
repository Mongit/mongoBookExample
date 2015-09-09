var express = require('express');
var mongoose = require('mongoose');
var emailFactory = require('./../schemas/ch9/email');
var numberFactory = require('./../schemas/ch9/number');
var weekdayFactory = require('./../schemas/ch9/string');
var errorFactory = require('./../schemas/ch9/error');
var asynchFactory = require('./../schemas/ch9/asynch');
var ExampleFactory = require('./../schemas/ch9/finalExample');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var Email = mongoose.model('Email');
    
    Email.find(function(err, emails) {
        if(err) return next(err);
        res.json(emails);
    });
    
   // res.json([{ email: 'jaja@gmail.com'}]);
});

router.post('/', function(req, res, next) {
    var email = emailFactory({ email: req.body.email});
    
    email.save(function (err,data) {
        if(err) return next(err);
        res.json({success: true});
    });
});

router.delete('/:id', function(req, res, next) {
    var Email = mongoose.model('Email');
    
    Email.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});


//Numbers
router.get('/number', function(req, res, next) {
    var Number = mongoose.model('Number');
    
    Number.find(function(err, numbers) {
        if(err) return next(err);
        res.json(numbers);
    });
});

router.post('/number', function(req, res, next) {
    var number = numberFactory({ age: req.body.age});
    
    number.save(function (err,data) {
        if(err) return next(err);
        res.json({success: true});
    });
});

router.delete('/number/:id', function(req, res, next) {
    var Number = mongoose.model('Number');
    
    Number.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});


//String
router.get('/string', function(req, res, next) {
    var Weekdays = mongoose.model('Weekdays');
    
    Weekdays.find(function(err, weekdays) {
        if(err) return next(err);
        res.json(weekdays);
    });
});

router.post('/string', function(req, res, next) {
    var weekday = weekdayFactory({ day: req.body.day});
    
    weekday.save(function (err,data) {
        if(err){
            Object.keys(err.errors).forEach(function(key) {
                var message = err.errors[key].message;
                console.log('Validation error for "%s": %s', key, message);
            });
        }
        res.json({success: true});
    });
});

router.delete('/string/:id', function(req, res, next) {
    var Weekdays = mongoose.model('Weekdays');
    
    Weekdays.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});


//Errors, los errores los imprime en la consola al no poner nombre ni email.
router.get('/error', function(req, res, next) {
    var User = mongoose.model('User2');
    
    User.find(function(err, users) {
        if(err) return next(err);
        res.json(users);
    });
});

router.post('/error', function(req, res, next) {
    var error = errorFactory({ name: req.body.name, email: req.body.email});
    
    error.save(function (err,data) {
        if(err){
            Object.keys(err.errors).forEach(function(key) {
                var message = err.errors[key].message;
                console.log('Validation error for "%s": %s', key, message);
            });
        }
        res.json({success: true});
    });
});

router.delete('/error/:id', function(req, res, next) {
    var User = mongoose.model('User2');
    
    User.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});

//Non-blocking, asynchronous validaton
router.get('/asynch', function(req, res, next) {
    var Asynch = mongoose.model('Username');
    
    Asynch.find(function(err, users) {
        if(err) return next(err);
        res.json(users);
    });
});

router.post('/asynch', function(req, res, next) {
    var asynch = asynchFactory({ username: req.body.username });
    
    asynch.save(function (err,data) {
        if(err) {
            Object.keys(err.errors).forEach(function(key) {
                var message = err.errors[key].message;
                console.log('Validation error for "%s": %s', key, message);
            });
        }
        res.json({success: true});
    });
});

router.delete('/asynch/:id', function(req, res, next) {
    var Asynch = mongoose.model('Username');
    
    Asynch.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});

//FINAL EXAMPLE
router.get('/example', function(req, res, next) {
    var Example = mongoose.model('Example');
    
    Example.find(function(err, users) {
        if(err) return next(err);
        res.json(users);
    });
});

router.post('/example', function(req, res, next) {
    var example = ExampleFactory({ name: req.body.name,
                                 email: req.body.email});
    
    example.save(function (err,data) {
        if(err) {
            Object.keys(err.errors).forEach(function(key) {
                var message = err.errors[key].message;
                console.log('Validation error for "%s": %s', key, message);
            });
        }
        res.json({success: true});
    });
});

router.delete('/example/:id', function(req, res, next) {
    var Example = mongoose.model('Example');
    
    Example.findByIdAndRemove(req.params.id, function(err, email) {
        if(err) return next(err);
        res.json({success:true});
    }); 
});

module.exports = router;
