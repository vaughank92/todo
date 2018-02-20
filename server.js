//setup

var express = require('express');
var app = express();
//mongoose for mongodb
var mongoose = require('mongoose');
//log requests to the console
//HTTP request logger middleware for node.js
var morgan = require('morgan');
//pull info from html post
var bodyParser = require('body-parser');
//simulate delete and put
var methodOverride = require('method-override');

//config

// mongoose.connect('mongodb:/node:username@mongo.onmodulus.net:27017/uw03mypu');
mongoose.connect('mongodb://localhost/todo');

//set static files location
app.use(express.static(__dirname + '/public'));
//log every request to the console
app.use(morgan('dev'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
//parse application/json
app.use(bodyParser.json());
//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//listen (start app with node server.js)
app.listen(8080);

console.log("App listening at port 8080");

//model

var Todo = mongoose.model('Todo', {
	text : String
});

//routes

//api
//get all todos
app.get('/api/todos', function(req, res) {
	//mongoose gets all the todos
	Todo.find(function(err, todos) {
		if(err)
			res.send(err);
		res.json(todos);
	});
});

//create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
	//create todo
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if(err)
			res.send(err);

		//get and return all todos
		Todo.find(function(err, todos) {
			if(err)
				res.send(err)
			res.json(todos);
		});
	});
});

//delete
app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo) {
		if(err)
			res.send(err);

		//get and return all todos
		Todo.find(function(err, todos) {
			if(err)
				res.send(err)
			res.json(todos);
		});
	});
});






