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

frisby.create('Verify Account Deleted')
//Tries to retrieve deleted account (expected to fail)
	.get(BackofficeQA + accountService + '/' + json.id)
	.expectStatus(500)
	.inspectJSON()
	.after(function(){console.log('============End of Verify Account Deleted========')})
	.toss();