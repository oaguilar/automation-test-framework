/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var kermitURL = 'http://10.202.207.179:5555/kermit/'
var call = 'core/catset'


frisby.create('kermit_core_Catset')
//Retrieves list of all accounts
	.get(kermitURL+call)
		.expectStatus(200)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	.toss();