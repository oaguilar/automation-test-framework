/* jasmine-node Q_API_TEST_USERAUTH_spec.js */
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
		
//Creation of Editor User//		
    frisby.create('User Editor Create New')
		.post(BackofficeQA + restAccount + '/user',	
{
	username: 'frisbyEditor',
	email: 'restapiEditor@attensity.com',
	password: autoPassword,
	account: automationAccountID,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: autoAccountName,
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
		
//Deletion of Editor User//
	frisby.create('User Editor Delete')
		.delete(QQA + restUser +  '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Editor User Delete<<<<<=====')})
		.toss();
	}).toss();
}).toss();

//Validates Weak Password Requirements//
    frisby.create('User Weak Password Create New')
		.post(BackofficeQA + restAccount + '/user',	
	{
		username: 'WeakPassword',
		email: 'restapi@attensity.com',
		password: 'password1',
		account: automationAccountID,
		enabled: true,
		accountAdminUser: false,
		loginFailed: false,
		id: -1,
		accountName: autoAccountName,
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
		.post(BackofficeQA + restAccount + '/user',
	{
		username: 'frisbyAdmin',
		email: 'restapi@attensity.com',
		password: 'P@ssword1',
		account: automationAccountID,
		enabled: true,
		accountAdminUser: false,
		loginFailed: false,
		id: -1,
		accountName: autoAccountName,
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
		.post(BackofficeQA + restAccount + '/user',	
		{
			id: id,
			account: automationAccountID,
			accountName: autoAccountName,
			username: 'frisbyAdmin',
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
		.post(BackofficeQA + restAccount + '/user',		
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
		.post(BackofficeQA + restAccount + '/user',		
		{
			account: automationAccountID,
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
		.delete(BackofficeQA + restAccount + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Admin User Delete<<<<<=====')})
		.toss();
	}).toss();	
}).toss();		
	

	


