/* jasmine-node GET_rest_categories_spec.js */
//This test gets a list of all of the categories for a specific account.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('GET list of categories for specific account')
//Gets a complete list of categories for a specific account. 
	.get(QHTTP + URL_RESTKITKAT)
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of GET categories<<<<<=====')})		
	.toss();