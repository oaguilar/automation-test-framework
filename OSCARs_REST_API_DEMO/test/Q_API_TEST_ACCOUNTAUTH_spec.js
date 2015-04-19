/* jasmine-node Q_API_TEST_ACCOUNTAUTH_spec.js */

var frisby = require('frisby')
var URL = 'http://stage-q01.attensity.com:8080'
var accountAuthService = 'SaasCoreAccountManager/rest/accountauth'
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
		}).toss();	
	}).toss();