/* jasmine-node Q_API_TEST_QUSERAUTH_LOGIN_spec.js */
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
//Attensity Q User UToken//		
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    frisby.create('UToken - User Attensity Q')
		.post(QQA + restUser + '/auth',
		{
		  username: autoUsername,
		  password: autoPassword,
		  accountName: autoAccountName
		},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of UToken - User Attensity Q<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
	 });

//Create “FALSE” Unique Username//	 
	frisby.create('User Unique (FALSE)')
		.post(QQA + restUser +  '/user/unique',
		{
		  account: automationAccountID,
		  username: autoUsername
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (FALSE)<<<<<=====')})
		.toss();
		
//Create “FALSE” Unique Username//	 
	frisby.create('User Unique (TRUE)')
		.post(QQA + restUser +  '/user/unique',
		{
		  account: automationAccountID,
		  username: 'apirest'
		})
		.expectStatus(200)
		.expectJSON({unique: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (TRUE)<<<<<=====')})
		.toss();
	 
//Verifies Username is invalid; Login Failed = true// 	
    frisby.create('Username Invalid')
		.post(QQA + restUser +  '/auth',
		{
		  username: 'invalidusername',
		  password: autoPassword,
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Username Invalid<<<<<=====')})
		.toss();
		
//Verifies Password is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(QQA + restUser +  '/auth',
		{
		  username: autoUsername,
		  password: 'InvalidPassword',
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Password Invalid<<<<<=====')})
		.toss();
		
//Verifies Account is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(QQA + restUser +  '/auth',
		{
		  username: autoUsername,
		  password: autoPassword,
		  accountName: 'Invalidaccount'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Invalid<<<<<=====')})
		.toss();
	
//Verifies Attensity Q Username & Password is valid; Login Failed = false// 	
    frisby.create('Account User Valid Login')
		.post(QQA + restUser +  '/auth',
		{
		  username: autoUsername,
		  password: autoPassword,
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account User Valid Login<<<<<=====')})
		.toss();
	}).toss();