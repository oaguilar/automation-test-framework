/* jasmine-node DELETE_rest_categories_OOBtemplate_spec.js */
//This test tries to delete an OOB template.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;
var OOBcatsetID = configuration.OOBcatset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Tries to delete the OOB template
frisby.create('Empty try to delete OOB template')	
	.delete(QHTTP + URL_RESTKITKAT + '/' + OOBcatsetID)
	.expectStatus(401)
    .after(function() {console.log('=====>>>>>End Of cat_set Delete<<<<<=====')})
	.toss();