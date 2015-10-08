 /* jasmine-node Q_API_TEST_BOUSERAUTH_READONLY_spec.js */
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
var QQA02 = configuration.QQA02;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;


 
 
require('./BO_API_TEST_AccountAuthReadyOnly_spec.js');
var id = json.id

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
 //include auth token in the header of all future requests (Callback function to run after test is completed. )*/
     frisby.globalSetup({
       request: { 
 		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
 		json: true },
 		timeout: 24000
 	 });


//Verifying Termination of Authkey//
	frisby.create('TermAuthKey')
		.get(QQA02 + restUser + '/user/' + id)
		.expectStatus(500)
		.inspectJSON()
		.expectJSON({
				type: 'User',
				key: 'UserNotFound'
		})
		.after(function() {console.log('=====>>>>>End Of TermAuthKey<<<<<=====')})
		.toss();
		}).toss();
		
	frisby.create('AccountAuthentication')
	//authenticates the user to Account Manager
		.post(BackofficeQA + accountAuthService,
		{username : userAccount, password: passwordAccount},
		{json: true},
		{headers: {'Content-Type': 'application/json' }}
		)
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSON({
				enabled: true,
				loginFailed: false
		})
		.expectJSONTypes({
				authkey: String,
				account: Number
		})
	    .after(function() {console.log('=====>>>>>End Of Account Authentication<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: {	'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)   
		});
		}).toss();