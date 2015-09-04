var express = require('express');
var mongoose = require('mongoose');
var emailFactory = require('./../schemas/ch9/email');
var numberFactory = require('./../schemas/ch9/number');
var weekdayFactory = require('./../schemas/ch9/string');

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
        if(err) return next(err);
        res.json({success: true});
    });
});

module.exports = router;
