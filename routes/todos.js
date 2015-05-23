var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* Create todo*/
router.post('/', function(req, res, next) {
	Todo.create(req.body, function(err, post) {
		if (err) {
			return next(err);
		} else {
			res.json(post);
		}
	});
});

router.get('/:id', function(req, res, next) {
	Todo.findById(req.params.id, function(err, note) {
		if (err) {
			return next(err);
		} else {
			res.json(note);
		}
	});
});

router.put('/:id', function(req, res, next) {
	Todo.findByIdAndUpdate(req.params.id, req.body, function(err, updated) {
		if (err) {
			return next(err);
		} else {
			res.json(updated);
		}
	});
});

//remove one todo note
router.delete('/:id', function(req, res, next) {
	Todo.findByIdAndRemove(req.params.id, req.body, function(err, removedNote) {
		if (err) {
			return next(err);
		} else {
			res.json(removedNote);
		}
	});
});

//bulk remove
router.post('/all', function(req, res, next) {
	console.log('starting to remove');
	Todo.remove('', function(err, removed){
		if (err) return next(err);
		res.json(removed);
	});
});

module.exports = router;