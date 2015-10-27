/* jasmine-node Q_API_TEST_ACCOUNTAUTH_spec.js */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var accountAuthService = configuration.accountAuthService;
var usernameVal = configuration.usernameVal;
var invalidPassword = configuration.invalidPassword;

	frisby.create('AccountAuth Invalid Account Name')
		.post(BackofficeQA + accountAuthService,{ 
			username : usernameVal, 
			password: invalidPassword
			},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of AccountAuth Invalid Account Name<<<<<=====')})
		.toss();