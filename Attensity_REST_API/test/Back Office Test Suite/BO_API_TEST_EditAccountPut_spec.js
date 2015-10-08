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
require('./BCKOFFC_API_TESTSUITE_spec.js');
var id = json.id;

frisby.create('Edit Account Put')
//Edits an existing account using put
	.put(BackofficeQA + accountService + '/' + json.id, {
		maxVolumeLimit: 1000,
		maxUserLimit: 10,
		maxTopicLimit: 10
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 1000,
		maxUserLimit: 10,
		maxTopicLimit: 10
	})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Put<<<<<=====')})		
	.toss();
	