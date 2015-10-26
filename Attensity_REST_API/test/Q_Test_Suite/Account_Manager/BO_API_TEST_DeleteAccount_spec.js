/* jasmine-node BO_API_TEST_DeleteAccount_spec.js */
//This test creates an edits an account repeatedly, testing all supported accountType, accountLanguage, maxTopicLimit, and maxTopicVolume values.

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
require('./BCKOFFC_API_TESTSUITE_spec.js');
var id = json.id

frisby.create('Delete Account')
//Deletes account created during test
	.delete(BackofficeQA + accountService + '/' + json.id)
	.expectStatus(200)
	.after(function() {console.log('=====>>>>>End Of Delete Account<<<<<=====')})
	.toss();