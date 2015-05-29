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
var passwordAccount = configuration.passwordAccount;
var passwordVal = configuration.passwordVal;
var invalidUserName = configuration.invalidUserName;

frisby.create('AccountAuth Invalid User Name')
		.post(BackofficeQA + accountAuthService,{ 
			username : invalidUserName, 
			password: passwordVal
			},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' },
		timeout:24000
		})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSON({
				enabled: true,
				loginFailed: true,
				id: -1,
		})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of AccountAuth Invalid User Name<<<<<=====')})
		.toss();	
		