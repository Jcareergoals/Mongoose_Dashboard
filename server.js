var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express(); 

app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.urlencoded());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/the_pack'); 

var AnimalSchema = new mongoose.Schema({
	name: String,
	gender: String,
	age: Number,
	description: String
}); 
mongoose.model('rabbit', AnimalSchema); 
var rabbit = mongoose.model('rabbit');

// to be delegated to routes folder
app.get('/', function(req, res){
	rabbit.find({},function(err, animal){
		if(err){
			console.log(err);
		} else {
			// console.log(animal);
			res.render('index', animal); 
		}
	}); 
});

app.listen(8888, function(){
	console.log('Listening at port: 8888');
});