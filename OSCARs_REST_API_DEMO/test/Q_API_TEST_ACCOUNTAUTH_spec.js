/* jasmine-node Q_API_TEST_ACCOUNTAUTH_spec.js */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var URL = configuration.BOHTTP
var accountAuthService = 'SaasCoreAccountManager/rest/accountauth'
var accountService = 'SaasCoreAccountManager/rest/account'
var usernameVal = 'account'
var invalidUserName = 'squirrel'
var passwordVal = 'account'
var invalidPassword = 'squirrel'

frisby.create('AccountAuth Invalid User Name')
		.post(URL + '/' + accountAuthService,{ 
			username : invalidUserName, 
			password: passwordVal
			},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
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
		.post(URL + '/' + accountAuthService,{ 
			username : usernameVal, 
			password: invalidPassword
			},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSON({
				enabled: true,
				loginFailed: true,
				id: -1,
		})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of AccountAuth Invalid Account Name<<<<<=====')})
		.toss();	

	frisby.create('Valid Account AuthToken')
		.post(URL + '/' + accountAuthService,
		{username : usernameVal, password: passwordVal},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
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
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of Valid Account AuthToken<<<<<=====')})
        .afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: {	'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
    });
	
	frisby.create('Get Account Auth Session')
	.get(URL + '/' + accountAuthService)
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
	.get(URL + '/' + accountService)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	.toss();
		
	frisby.create('Delete Auth Session')
		.delete(URL + '/' + accountAuthService + '/' + account)
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
		.toss();
		
	frisby.create('GetAccountList')
	//Retrieves list of all accounts - normally this should fail, because of a bug it is currently successful.  Once ART-3014 is fixed, update test to expect failure
	.get(URL + '/' + accountService)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	.toss();
		
		}).toss();	
	}).toss();