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
var accountService = configuration.accountService;
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;
var usernameVal = configuration.usernameVal;
var passwordVal = configuration.passwordVal;
var invalidUserName = configuration.invalidUserName;
var invalidPassword = configuration.invalidPassword;
var BackofficeQA = configuration.BackofficeQA;


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

	frisby.create('Valid Account AuthToken')
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
	
	frisby.create('Get Account Auth Session')
	.get(BackofficeQA + '/' + accountAuthService)
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({
			username: String,
			account: Number,
			enabled: Boolean,
			accountAdminUser: Boolean,
			loginFailed: Boolean,
			id: Number,
			authkey: String,
			accountType: Number,
			expirationDate: Number,
			maxTopicLimit: Number
		})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Get Account Auth Session<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 
	frisby.create('GetAccountList')
	//Retrieves list of all accounts
	.get(BackofficeQA + '/' + accountService)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	.toss();
		
	frisby.create('Delete Auth Session')
		.delete(BackofficeQA + '/' + accountAuthService + '/' + account)
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({
			account: Number,
			enabled: Boolean,
			accountAdminUser: Boolean,
			id: Number,
			preferences: {
			timeZoneString: String,
			timeZoneOffset: Number
			},
			accountType: Number,
			expirationDate: Number,
			maxTopicLimit: Number
		})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Delete Auth Session<<<<<=====')})
		
		
	frisby.create('GetAccountList')
	//Retrieves list of all accounts - this should fail because auth session is no longer valid
	.get(BackofficeQA + '/' + accountService)
		.expectStatus(401)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	
		
		}).toss();	
	}).toss();