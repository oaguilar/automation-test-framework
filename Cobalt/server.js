//Old Express section
var port = process.env.PORT || 8888;

var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(port);

//modules

/*var express = require('express');
var app = express();
var mongoose = require('mongoose');

//configuration


//config files
var db = require('./config/db');


//mongoose.connect(db.url);

app.configure( function () {
	app.use(express.static(__dirname));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//routes
//require('./app/app')(app);

//start app
app.listen(port);

exports = module.exports = app;*/

console.log('Magic happends on port' + port);