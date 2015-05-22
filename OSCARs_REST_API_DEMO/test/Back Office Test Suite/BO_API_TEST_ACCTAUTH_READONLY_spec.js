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


//Creation of Ready-only User//		
    frisby.create('User Ready-only Create New')
	.post(BackofficeQA + restAccount + '/user',	
{
	username: 'frisbyReadOnly',
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
		id: 3,
		description: 'Ready-only',
		roleName: 'Ready-only',
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
		.after(function() {console.log('=====>>>>>End Of User Ready-only Create New<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		 var username = json.username
		 
//Deletion of Editor User//
	frisby.create('User Ready-only Delete')
		.delete(BackofficeQA + restAccount + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Ready-only User Delete<<<<<=====')})
		.toss();
		
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
	}).toss();


