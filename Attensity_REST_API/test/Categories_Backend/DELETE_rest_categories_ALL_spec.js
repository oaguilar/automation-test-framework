/* jasmine-node DELETE_rest_categories_ALL_spec.js */
//This test tries to delete all catsets.

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
//Tries to delete the OOB template
frisby.create('Try to delete all catsets, dont specify any catsets')	
	.delete(QHTTP + URL_RESTKITKAT + '/')
	.expectStatus(405)
    .after(function() {console.log('=====>>>>>End Of ALL cat_set Delete<<<<<=====')})
	.toss();