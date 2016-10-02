// Required modules
var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	moment = require('moment'),
	formidable = require("formidable");

var ejs = require('ejs');
var fs = require('fs');

app.use(express.static(__dirname + '/public'));                 // static files
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Server start-up
var server = app.listen(8080, function (req, res) {
  console.log("Listening on port %s", server.address().port);
});

// Variables
var height = 0;
var weight = 0;

// Routes
app.get('/', function (req, res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/index.html");
});

app.get('/today', function(req,res) {
	console.log("GLOBAL: " + height + " " + weight) 
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/today.html");
});

app.get('/journal', function(req,res) {
	fs.readFile(__dirname + "/public/journal.html", 'utf-8', function(err, content) {
		if (err) {
			res.end('error');
			return;
		}
	
		var settings = [height, weight]
		var renderedHtml = ejs.render(content, {settings: settings});
		res.end(renderedHtml);
	});
    // if (!res.headersSent)
    // 	res.sendFile(__dirname + "/public/journal.html");
});

app.get('/settings', function(req,res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/settings.html");
});

app.post('/settings', function(req,res) {
	height = req.body.height;
	weight = req.body.weight;
	console.log("height is " + height + '\n' + "weight is " + weight);
	res.sendFile(__dirname + "/public/settings.html");
})

// app.post('/settings', function(req, res) {
//     console.log('Username: ' + req.body.username);
// });