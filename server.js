var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express(); 

app.use(express.static(__dirname+'/static'));
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

// ================== URLS ========================

// Displays all rabbits
app.get('/', function(req, res){
	rabbit.find({},function(err, data){
		res.render('index', {rabbits:data});
	}); 
});
// Displays form for creating a new rabbit
app.get('/rabbit/new/', function(req, res){
	res.render('new'); 
}); 
// Displays specified rabbit using ajax call 
app.get('/rabbit/:id', function(req, res){
	rabbit.find({_id:req.params.id}, function(err, data){
		res.send(data);
	});
}); 

// Creates new rabbit
app.post('/rabbit', function(req,res){
	var newRabbit = new rabbit({
		name: req.body.name, 
		gender: req.body.gender,
		age: req.body.age,
		description: req.body.background
	}); 
	newRabbit.save(function(err){
		if(err){
			console.log(err);
			res.render('/rabbit/new', {error:err});
		} else {
			res.redirect('/');
		}
	});
});
// Displays form to edit individual rabbit
app.get('/rabbit/:id/edit', function(req, res){
	rabbit.findOne({_id:req.params.id},function(err, data){
		if(err){
			console.log('There was an error!'); 
			console.log(err.errors);
			res.redirect('/'); 
		} else {
			console.log(data);
			res.render('edit', {rabbit:data}); 
		}
	}); 
});
// Updates individual rabbit
app.post('/rabbit/:id', function(req,res){
	rabbit.update({_id:req.params.id},{
		name: req.body.name, 
		age: req.body.age, 
		description: req.body.background
	}, function(err){
		console.log("updating rabbit:");
		res.redirect('/');
	});
}); 
// Destroys rabbit object 
app.post('/rabbit/:id/destroy', function(req, res){
	console.log("Deleting: ");
	console.log(req.params.id); 
	rabbit.remove({_id:req.params.id}, function(err){
		res.redirect('/'); 
	})
}); 

// LISTENING PORT
app.listen(8888, function(){
	console.log('Listening at port: 8888');
});