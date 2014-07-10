var port = process.env.PORT || 8888;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override')
var mongoose = require('mongoose');
var db = require('./config/db');
mongoose.connect(db.url);

var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(morgan());
app.use(methodOverride());

app.listen(port);

console.log('Magic happends on port' + port);