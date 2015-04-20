/* jasmine-node Q_API_TEST_USERACCOUNT_spec.js */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var HTTP = configuration.HTTP;
var HTTPS = configuration.HTTPS;
var URLACT = configuration.URL_RESTACT;
var URLUSR = configuration.URL_RESTUSR;


	frisby.create('UToken - User Account')
		.post(HTTP + URLACT + '/accountauth',
		{ username : configuration.useraccount, password: configuration.passwordaccount},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>UToken - User Account Completed<<<<<=====')})
		.toss();
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    frisby.create('UToken - User - qabeta/admin')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username:'restapi',
		  password:'w3t3$t4U',
		  accountName:'qabeta'
		},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of UToken - User - qabeta/admin<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
	 });
		
    frisby.create('UToken - User - qabeta/editOnly')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username:'restapiEDITOR',
		  password:'P@ssword1',
		  accountName:'qabeta'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of UToken - User - qabeta/editOnly<<<<<=====')})
		.toss();
	
	frisby.create('UToken - User - qabeta/readOnly')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username:'restapiREADONLY',
		  password:'P@ssword1',
		  accountName:'qabeta'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of UToken - User - qabeta/readOnly<<<<<=====')})
		.toss();
		
    frisby.create('User List Username')
		.get(HTTPS + URLUSR + '/user')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User List Username<<<<<=====')})
		.toss();
		
	frisby.create('User Unique (FALSE)')
		.post(HTTPS + URLUSR + '/user' + '/unique',
		{
		  account: 10020,
		  username: 'restapi'
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (FALSE)<<<<<=====')})
		.toss();

	frisby.create('User Unique (TRUE)')
		.post(HTTPS + URLUSR + '/user' + '/unique',
		{
		  account: 10020,
		  username: 'apirest'
		})
		.expectStatus(200)
		.expectJSON({unique: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (TRUE)<<<<<=====')})
		.toss();
		
		
    frisby.create('User Create New (WEAK_PASSWORD_NOT_VALID)')
		.post(HTTPS + URLUSR + '/user',		
		{
			id: -1,
			account: 10020,
			accountName: 'qabeta',
			username: 'frisbyuser',
			email: 'oaguilar@attensity.com',
			password: 'password1',
			updatePassword: true,
			enabled: true,
			admin: true,
			allowEditTopic: true,
			accessEli: true,
			accessTempEditorEli: true,
			accountType: 0,
			brandName: 'attensity',
			userRole: {
						description: 'Admin',
						roleName: 'Admin'
		}})
		.expectStatus(500)
		.expectJSON({type: 'VALIDATION_FAIL'})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Create New (WEAK_PASSWORD_NOT_VALID)<<<<<=====')})
		.toss();
		
    frisby.create('User Create New (VALID PASSWORD)')
		.post(HTTPS + URLUSR + '/user',		
		{
			id: -1,
			account: 10020,
			accountName: 'qabeta',
			username: 'frisbyuser',
			email: 'oaguilar@attensity.com',
			password: 'P@ssword1',
			updatePassword: true,
			enabled: true,
			admin: true,
			allowEditTopic: true,
			accessEli: true,
			accessTempEditorEli: true,
			accountType: 0,
			brandName: 'attensity',
			userRole: {
						description: 'Admin',
						roleName: 'Admin'
		}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Create New (VALID PASSWORD)<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		 var username = json.username
		 
    frisby.create('User Edit Permissions')
		.post(HTTPS + URLUSR + '/user',		
		{
			id: id,
			account: account,
			accountName: accountName,
			username: username,
			enabled: true,
			accountType: 0,
			brandName: 'attensity',
			userRole: {
						roleName: 'editor'
					  },
			preferences: {
							timeZoneString: 'America/New_York',
							timeZoneOffset: -14400000
						 }
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Edit Permissions<<<<<=====')})
		.toss();
		
    frisby.create('User Update Email')
		.post('https://stage-q02.attensity.com:8443/SaasCoreUserManager/rest/profile/',		
		{
			id: id,
			email: 'oaguilar.1@attensity.com'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Email<<<<<=====')})
		.toss();
		
    frisby.create('User Update Password')
		.post('https://stage-q02.attensity.com:8443/SaasCoreUserManager/rest/profile/password',		
		{
			id: id,
			password: 'P@ssword2',
			updatePassword: true
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Password<<<<<=====')})
		.toss();
		
		
	frisby.create('User Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Delete<<<<<=====')})
		
		}).toss();	
 }).toss();
		