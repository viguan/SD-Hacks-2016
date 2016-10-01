// Required modules
var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	moment = require('moment'),
	formidable = require("formidable");

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

// Routes
app.get('/', function (req, res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/index.html");
});

app.get('/today', function(req,res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/today.html");
});

app.get('/journal', function(req,res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/journal.html");
});

app.get('/settings', function(req,res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/settings.html");
});

function processAllFieldsOfForm(req,res) {
	var form = new formidable.IncomingForm();

	form.parse(req, function (err, fields, files) {
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('received the data:\n\n');
		res.end(util.inspect({
			fields:fields,
			files: files
		}));
	});
}