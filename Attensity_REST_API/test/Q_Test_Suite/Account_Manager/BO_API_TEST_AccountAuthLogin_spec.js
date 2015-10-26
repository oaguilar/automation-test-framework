/* jasmine-node BO_API_TEST_AccountAuthLogin_spec.js */
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
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;
var automationAccountID = configuration.automationAccountID;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;
var restAccount = configuration.restAccount;
var QQA = configuration.QQA;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;


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
		
//Verifies Password is invalid; Login Failed = true// 
	    frisby.create('Account Password Invalid')
		.post(BackofficeQA + accountAuthService,
		{
		  username: userAccount,
		  password:'InvalidPassword'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Password Invalid<<<<<=====')})
		.toss();
		
//Verifies Back Office Username & Password is valid; Login Failed = false// 
	    frisby.create('Account Login Valid')
		.post(BackofficeQA + accountAuthService,
		{
		  username: userAccount,
		  password: passwordAccount
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Login Valid<<<<<=====')})
		.toss();
