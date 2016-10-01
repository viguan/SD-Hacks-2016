// Required modules
var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	moment = require('moment');

app.use(express.static(__dirname + '/public'));                 // static files
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Server start-up
var server = app.listen(8080, function () {
  console.log("Listening on port %s", server.address().port);
});

// Routes
app.get('/', function (req, res) {
    if (!res.headersSent)
    	res.sendFile(__dirname + "/public/index.html");
});