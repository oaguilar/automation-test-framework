/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */
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

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(BackofficeQA + accountService, {
		id: json.id,
		name: "FrisbyTestAcctPARAMEdited",
		accountLanguages:[{name: "English", abbreviation: "en"},{name: "French", abbreviation: "fr"}, {name: "German", abbreviation: "de"}],
		accountType: 2,
		maxVolumeLimit: 10000,
		maxTopicLimit: 15,
		maxUserLimit: 25
	})
	.expectStatus(200)
	.expectJSON({
		accountType: 2,
		maxVolumeLimit: 10000,
		maxTopicLimit: 15,
		maxUserLimit: 25,
		accountLanguages: [
		{
			name: "English",
			abbreviation: "en"
		},
		{
			name: "French",
			abbreviation: "fr"
		},
		{
			name: "German",
			abbreviation: "de"
		}]
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.toss();