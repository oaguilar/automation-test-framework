/* jasmine-node GET_rest_categories_template=true_editable=true_spec.js */
//This test returns a list of the editable templates for an account.

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
frisby.create('GET a single catset for specific account')
//Gets a single catset for a specific account. 
	.get(QHTTP + URL_RESTKITKAT + '/?template=true&editable=true')
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of GET template=T & editable=T<<<<<=====')})		
	.toss();