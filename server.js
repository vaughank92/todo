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

//config load
var database = require('./config/database');
mongoose.connect(database.url);

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

//load the routes
require('./app/routes')(app);

//listen (start app with node server.js)
app.listen(8080);
console.log("App listening at port 8080");
