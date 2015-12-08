if(!process.env.NODE_ENV){
	var dotenv = require("dotenv");
	dotenv.load();
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var passport = require('passport');

require('./models/user');
require('./models/playlist');

var db = process.env.MONGOLAB_URI || 'mongodb://localhost/playlist' ;
mongoose.connect(db, function(err) {
	if(err) return console.log("Error connecting to db: %s", db) ;
	console.log("Connected to %s", db) ;
}) ;


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var userRoutes = require('./routes/UserRoutes');
var playlistRoutes = require('./routes/PlaylistRoutes');


//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/user', userRoutes);
app.use('/api/playlist', playlistRoutes)

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});