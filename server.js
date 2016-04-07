// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
// static content 
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
	res.render("index");
})
app.get('/show', function(req, res) {
	res.render("show", stuff);
	console.log(stuff.name + " is post data")
})
// post route for adding a user
app.post('/users', function(req, res) {
	console.log("POST DATA", req.body);
	stuff = req.body
	res.redirect('/show');
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
})

var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket){
	console.log("SOCKET TO ME");
	console.log(socket.id)
	socket.on('posting_form', function (data){
		var randNum = Math.floor(Math.random() * (100 - 1) + 1)
		console.log(data.reason.name + 'IS FROM SERVER')
		console.log('HI')
		socket.emit('server_response', {response: data.reason, random: randNum});
	});
});