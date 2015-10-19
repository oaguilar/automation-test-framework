/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

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

frisby.create('GetAccountReport')
//Retrieves Account Management Report
	.get(BackofficeQA + accountService  + '/' + "accountreport")
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			accountId: Number,
			accountName: String,
			accountType: String,
			owner: String,
			ownerEmail: String,
			age: Number,
			requestDate: Number,
			expiryDate: Number,
			brand: String,
			notes: String,
			maxVolumeLimit: Number,
			maxTopicLimit: Number,
			currentTopicCount: Number,
			maxUserLimit: Number,
			currentUserCount: Number,
			status: String
		}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account Report<<<<<=====')})
	.toss();