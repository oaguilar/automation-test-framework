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

//UToken Fetch//
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

//Creation of Editor User//		
    frisby.create('User Editor Create New')
		.post(HTTP + URLACT + '/user',	
{
	username: 'frisbyEditor',
	email: 'restapiEditor@attensity.com',
	password: qpsswd,
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
		id: 2,
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
		  password: qpsswd,
		  accountName: acctnm
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
		
//Deletion of Editor User//
	frisby.create('User Editor Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Editor User Delete<<<<<=====')})
		.toss();
	}).toss();
	
//Creation of Ready-Only User//	
    frisby.create('User Ready-Only Create New')
		.post(HTTP + URLACT + '/user',	
	{
		username: 'frisbyReadOnly',
		email: 'restapiReadOnly@attensity.com',
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
			id: 3,
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
		.expectJSON ({userRole:
					   { id: 3,
						 description: 'Read-Only',
						 roleName: 'read_only',
						 userPermissions:
						  [ { permissionName: 'apply_filters',
							  permissionDesc: 'Able to apply filters' },
							{ permissionName: 'drill_down_article',
							  permissionDesc: 'Able to drill down the article' },
							{ permissionName: 'export',
							  permissionDesc: 'Able to export the data' },
							{ permissionName: 'share_data_dashboards',
							  permissionDesc: 'Able to share the data & dashboards' },
							{ permissionName: 'edit_users',
							  permissionDesc: 'Able to edit users' } ] },
							maxTopicLimit: 80 })
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Ready-Only Create New<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		 var username = json.username

//Deletion of Ready-Only User//		 
	frisby.create('Ready-Only User Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Ready-Only User Delete<<<<<=====')})
		.toss();
	}).toss();		
		
//Validates Weak Password Requirements//
    frisby.create('User Weak Password Create New')
		.post(HTTP + URLACT + '/user',	
	{
		username: 'WeakPassword',
		email: 'restapi@attensity.com',
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

//Creation of Admin User//		
    frisby.create('User Admin Create New')
		.post(HTTP + URLACT + '/user',	
	{
		username: 'frisbyAdmin',
		email: 'restapi@attensity.com',
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

//Edits Admin Role to Editor Role//		 
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

//Updates User's Email//		
    frisby.create('User Update Email')
		.post(HTTPS + URLUSR + '/user',		
		{
			id: id,
			email: 'restapi.1@attensity.com'
		})
		.expectStatus(200)
		.expectJSON({email: 'restapi.1@attensity.com'})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Email<<<<<=====')})
		.toss();	
		
//Udates User's Password//	
    frisby.create('User Update Password')
		.post(HTTPS + URLUSR + '/user',		
		{
			account: acctnr,
            oldpassword: 'P@ssword1',
			id: id,
			password: 'P@ssword2',
			updatePassword: true
		})
		.expectStatus(200)
		.expectJSON({password: 'P@ssword2'})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Password<<<<<=====')})
		.toss();	
		
//Deletion of Admin User//		
	frisby.create('Admin User Delete')
		.delete(HTTPS + URLUSR + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Admin User Delete<<<<<=====')})
		.toss();
		}).toss();	
	}).toss();	
}).toss();