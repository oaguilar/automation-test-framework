/* jasmine-node Q_API_TEST_USERAUTH_LOGIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'configuration.json';
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


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//UToken Fetch//
	frisby.create('UToken - Back Office Account')
		.post(BackofficeQA + accountAuthService,
		{ username : userAccount, password: passwordAccount},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>UToken - Back Office Account Completed<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
	 });
	 
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
}).toss();
		