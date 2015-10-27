/* jasmine-node Q_API_TEST_USERAUTH_LOGIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var accountAuthService = configuration.accountAuthService;
var passwordAccount = configuration.passwordAccount;

//Verifies Username is invalid; Login Failed = true// 
	    frisby.create('Account Username Invalid')
		.post(BackofficeQA + accountAuthService,
		{
		  username:'InvalidUsername',
		  password: passwordAccount
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Username Invalid<<<<<=====')})
		.toss();