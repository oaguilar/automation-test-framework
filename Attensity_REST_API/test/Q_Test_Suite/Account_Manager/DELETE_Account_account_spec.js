/* jasmine-node DELETE_Account_account_spec.js */
//This test creates an edits an account repeatedly, testing all supported accountType, accountLanguage, maxTopicLimit, and maxTopicVolume values.

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;
require('../BO_API_TESTSUITE_spec.js');
var id = json.id

frisby.create('DELETE Account')
//Deletes account created during test
	.delete(xBO_AUTH_URL + restAccount + 'account/' + json.id)
	.expectStatus(200)
	.after(function() {console.log('=====>>>>>End Of DELETE Account<<<<<=====')})
	.toss();