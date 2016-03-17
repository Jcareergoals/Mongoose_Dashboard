var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express(); 

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// set mongoose schema
// create model using schema
// get schema at to local model variable

//create routes to end up in locals folder 


app.listen(8888, function(){
	console.log('Listening at port: 8888');
});