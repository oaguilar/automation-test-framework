/* jasmine-node BO_API_TEST_GetAccountType_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var BackofficeQA = configuration.BackofficeQA;
var accountService = configuration.accountService;

frisby.create('GetAccountType')
//Retrieves list of the types of all current accounts
	.get(BackofficeQA + accountService + '/' + "accountInfo")
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			id: Number,
			accountType: String}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account Type<<<<<=====')})
	.toss();