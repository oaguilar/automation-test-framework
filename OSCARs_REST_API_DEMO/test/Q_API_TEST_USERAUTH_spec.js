/* jasmine-node Q_API_TEST_USERAUTH_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

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

var usrnm = configuration.useraccount;
var psswd = configuration.passwordaccount;

var qusrnm = configuration.username;
var qpsswd = configuration.password;
var acctnm = configuration.accountName;
var acctnr = configuration.accountnmbr;


	frisby.create('UToken - Back Office Account')
		.post(HTTP + URLACT + '/accountauth',
		{ username : usrnm, password: psswd},
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
		.post(HTTP + URLACT + '/accountauth',
		{
		  username:'InvalidUsername',
		  password: psswd
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Username Invalid<<<<<=====')})
		.toss();
		
//Verifies Password is invalid; Login Failed = true// 
	    frisby.create('Account Password Invalid')
		.post(HTTP + URLACT + '/accountauth',
		{
		  username: usrnm,
		  password:'InvalidPassword'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Password Invalid<<<<<=====')})
		.toss();
		
//Verifies Back Office Username & Password is valid; Login Failed = false// 
	    frisby.create('Account Login Valid')
		.post(HTTP + URLACT + '/accountauth',
		{
		  username: usrnm,
		  password: psswd
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Login Valid<<<<<=====')})
		.toss();
		
    frisby.create('User Editor Create New')
		.post(HTTP + URLACT + '/user',	
{
	username: 'frisbyEditor',
	email: 'oaguilar@attensity.com',
	password: 'P@ssword1',
	account: acctnr,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: acctnm,
	preferences: {
		timeZoneString: 'America/Denver',
		timeZoneOffset: -21600000
	},
	accountType: 0,
	brandName: 'attensity',
	expirationDate: 1451601777000,
	userRole: {
		id: 1,
		description: 'Editor',
		roleName: 'editor',
		userPermissions: [
		{
			permissionName: 'create_users',
			permissionDesc: 'Able to create users'
		},
		{
			permissionName: 'edit_users',
			permissionDesc: 'Able to edit users'
		},
		{
			permissionName: 'set_account_level_preferences',
			permissionDesc: 'Able to set Account level preferences'
		},
		{
			permissionName: 'view_account_reports',
			permissionDesc: 'Able to view account reports'
		},
		{
			permissionName: 'create_edit_topics',
			permissionDesc: 'Able to create/edit topics'
		},
		{
			permissionName: 'create_custom_entities',
			permissionDesc: 'Able to create custom entities'
		},
		{
			permissionName: 'apply_filters',
			permissionDesc: 'Able to apply filters'
		},
		{
			permissionName: 'drill_down_article',
			permissionDesc: 'Able to drill down the article'
		},
		{
			permissionName: 'export',
			permissionDesc: 'Able to export the data'
		},
		{
			permissionName: 'share_data_dashboards',
			permissionDesc: 'Able to share the data \u0026 dashboards'
		},
		{
			permissionName: 'access_eli',
			permissionDesc: 'Access ELI'
		},
		{
			permissionName: 'access_temp_editor_eli',
			permissionDesc: 'Access Temporary Editor ELI'
		}]
	},
	maxTopicLimit: 80
})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Editor Create New<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		 var username = json.username
			
		
//Attensity Q User UToken//		
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    frisby.create('UToken - User Attensity Q')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username: qusrnm,
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
		.post(HTTPS + URLUSR + '/user/unique',
		{
		  account: acctnr,
		  username: qusrnm
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (FALSE)<<<<<=====')})
		.toss();
		
//Create “FALSE” Unique Username//	 
	frisby.create('User Unique (TRUE)')
		.post(HTTPS + URLUSR + '/user/unique',
		{
		  account: acctnr,
		  username: 'apirest'
		})
		.expectStatus(200)
		.expectJSON({unique: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (TRUE)<<<<<=====')})
		.toss();
	 
//Verifies Username is invalid; Login Failed = true// 	
    frisby.create('Username Invalid')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username: 'invalidusername',
		  password: qpsswd,
		  accountName: acctnm
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Username Invalid<<<<<=====')})
		.toss();
		
//Verifies Password is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username: qusrnm,
		  password: 'InvalidPassword',
		  accountName: acctnm
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Password Invalid<<<<<=====')})
		.toss();
		
//Verifies Account is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username: qusrnm,
		  password: qpsswd,
		  accountName: 'Invalidaccount'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Invalid<<<<<=====')})
		.toss();
	
//Verifies Attensity Q Username & Password is valid; Login Failed = false// 	
    frisby.create('Account User Valid Login')
		.post(HTTPS + URLUSR + '/auth',
		{
		  username: qusrnm,
		  password: qpsswd,
		  accountName: acctnm
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account User Valid Login<<<<<=====')})
		.toss();

	frisby.create('User Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Delete<<<<<=====')})
		.toss();
	}).toss();
	
	
    frisby.create('User Ready-Only Create New')
		.post(HTTP + URLACT + '/user',	
{
	username: 'frisbyReadOnly',
	email: 'oaguilar@attensity.com',
	password: 'P@ssword1',
	account: acctnr,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: acctnm,
	preferences: {
		timeZoneString: 'America/Denver',
		timeZoneOffset: -21600000
	},
	accountType: 0,
	brandName: 'attensity',
	expirationDate: 1451601777000,
	userRole: {
		id: 1,
		description: 'Ready-Only',
		roleName: 'Ready-Only',
		userPermissions: [
		{
			permissionName: 'create_users',
			permissionDesc: 'Able to create users'
		},
		{
			permissionName: 'edit_users',
			permissionDesc: 'Able to edit users'
		},
		{
			permissionName: 'set_account_level_preferences',
			permissionDesc: 'Able to set Account level preferences'
		},
		{
			permissionName: 'view_account_reports',
			permissionDesc: 'Able to view account reports'
		},
		{
			permissionName: 'create_edit_topics',
			permissionDesc: 'Able to create/edit topics'
		},
		{
			permissionName: 'create_custom_entities',
			permissionDesc: 'Able to create custom entities'
		},
		{
			permissionName: 'apply_filters',
			permissionDesc: 'Able to apply filters'
		},
		{
			permissionName: 'drill_down_article',
			permissionDesc: 'Able to drill down the article'
		},
		{
			permissionName: 'export',
			permissionDesc: 'Able to export the data'
		},
		{
			permissionName: 'share_data_dashboards',
			permissionDesc: 'Able to share the data \u0026 dashboards'
		},
		{
			permissionName: 'access_eli',
			permissionDesc: 'Access ELI'
		},
		{
			permissionName: 'access_temp_editor_eli',
			permissionDesc: 'Access Temporary Editor ELI'
		}]
	},
	maxTopicLimit: 80
})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Ready-Only Create New<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		 var username = json.username
				
	frisby.create('User Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Delete<<<<<=====')})
		.toss();
	}).toss();		
		

    frisby.create('User Weak Password Create New')
		.post(HTTP + URLACT + '/user',	
{
	username: 'WeakPassword',
	email: 'oaguilar@attensity.com',
	password: 'password1',
	account: acctnr,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: acctnm,
	preferences: {
		timeZoneString: 'America/Denver',
		timeZoneOffset: -21600000
	},
	accountType: 0,
	brandName: 'attensity',
	expirationDate: 1451601777000,
	userRole: {
		id: 1,
		description: 'Admin',
		roleName: 'admin',
		userPermissions: [
		{
			permissionName: 'create_users',
			permissionDesc: 'Able to create users'
		},
		{
			permissionName: 'edit_users',
			permissionDesc: 'Able to edit users'
		},
		{
			permissionName: 'set_account_level_preferences',
			permissionDesc: 'Able to set Account level preferences'
		},
		{
			permissionName: 'view_account_reports',
			permissionDesc: 'Able to view account reports'
		},
		{
			permissionName: 'create_edit_topics',
			permissionDesc: 'Able to create/edit topics'
		},
		{
			permissionName: 'create_custom_entities',
			permissionDesc: 'Able to create custom entities'
		},
		{
			permissionName: 'apply_filters',
			permissionDesc: 'Able to apply filters'
		},
		{
			permissionName: 'drill_down_article',
			permissionDesc: 'Able to drill down the article'
		},
		{
			permissionName: 'export',
			permissionDesc: 'Able to export the data'
		},
		{
			permissionName: 'share_data_dashboards',
			permissionDesc: 'Able to share the data \u0026 dashboards'
		},
		{
			permissionName: 'access_eli',
			permissionDesc: 'Access ELI'
		},
		{
			permissionName: 'access_temp_editor_eli',
			permissionDesc: 'Access Temporary Editor ELI'
		}]
	},
	maxTopicLimit: 80
})
		.expectStatus(500)
		.expectJSON (
						{ type: 'VALIDATION_FAIL',
						  parameters: { messages: [ 'WEAK_PASSWORD_NOT_VALID' ] },
						  key: 'WEAK_PASSWORD_NOT_VALID' }
					)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Weak Password Create New<<<<<=====')})
		.toss();
		
    frisby.create('User Admin Create New')
		.post(HTTP + URLACT + '/user',	
{
	username: 'frisbyAdmin',
	email: 'oaguilar@attensity.com',
	password: 'P@ssword1',
	account: acctnr,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: acctnm,
	preferences: {
		timeZoneString: 'America/Denver',
		timeZoneOffset: -21600000
	},
	accountType: 0,
	brandName: 'attensity',
	expirationDate: 1451601777000,
	userRole: {
		id: 1,
		description: 'Admin',
		roleName: 'admin',
		userPermissions: [
		{
			permissionName: 'create_users',
			permissionDesc: 'Able to create users'
		},
		{
			permissionName: 'edit_users',
			permissionDesc: 'Able to edit users'
		},
		{
			permissionName: 'set_account_level_preferences',
			permissionDesc: 'Able to set Account level preferences'
		},
		{
			permissionName: 'view_account_reports',
			permissionDesc: 'Able to view account reports'
		},
		{
			permissionName: 'create_edit_topics',
			permissionDesc: 'Able to create/edit topics'
		},
		{
			permissionName: 'create_custom_entities',
			permissionDesc: 'Able to create custom entities'
		},
		{
			permissionName: 'apply_filters',
			permissionDesc: 'Able to apply filters'
		},
		{
			permissionName: 'drill_down_article',
			permissionDesc: 'Able to drill down the article'
		},
		{
			permissionName: 'export',
			permissionDesc: 'Able to export the data'
		},
		{
			permissionName: 'share_data_dashboards',
			permissionDesc: 'Able to share the data \u0026 dashboards'
		},
		{
			permissionName: 'access_eli',
			permissionDesc: 'Access ELI'
		},
		{
			permissionName: 'access_temp_editor_eli',
			permissionDesc: 'Access Temporary Editor ELI'
		}]
	},
	maxTopicLimit: 80
})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Admin Create New<<<<<=====')})
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
		.post(HTTPS + URLUSR + '/user',		
		{
			id: id,
			email: 'oaguilar.1@attensity.com'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Email<<<<<=====')})
		.toss();	
		
		
    frisby.create('User Update Password')
		.post(HTTPS + URLUSR + '/user',		
		{
			account: 10020,
            oldpassword: 'P@ssword1',
			id: id,
			password: 'P@ssword2',
			updatePassword: true
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Password<<<<<=====')})
		.toss();	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}).toss();	
		
		
		
		}).toss();	
		
	}).toss();