/* jasmine-node Q_API_TEST_BOUSERAUTH_ADMIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

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

frisby.create('Create Account')
//Creates a new account
	.post(BackofficeQA + accountService, {
		id: -1,
		name: 'FrisbyTestAcctPARAM',
		accountType: 0,
		accountPermissions: [],
		accountLanguages:[{name: 'English', abbreviation: 'en'}],
		maxVolumeLimit: 1000,
		maxTopicLimit: 5,
		maxUserLimit: 5,
		contactEmail: "test@attensity.com",
		contactName: "TestContact",
		address: "123 Main Street",
		city: "Salt Lake City",
		state: "UT",
		zipCode: "84101",
		userCount: 1,
		user: {
			username: "AdminUser",
			email: "janesmith@gmail.com",
			password: "Admin1234",
			updatePassword: false,
			enabled: true,
			admin: true
		},
		psOwner: "PS Personnel"
	})
	.expectStatus(200)
	.expectJSON({
		name: 'FrisbyTestAcctPARAM',
		user: {
			username: "AdminUser",
			email: "janesmith@gmail.com",
			enabled: true,
			accountAdminUser: false,
			loginFailed: false,
			preferences: {
				timeZoneString: "America/New_York",
				timeZoneOffset: -14400000
			},
			accountType: 0,
			userRole: {
				id: 1,
				description: "Admin",
				roleName: "admin",
				userPermissions: [{
					permissionName: "create_users",
					permissionDesc: "Able to create users"
				},
				{
					permissionName: "edit_users",
					permissionDesc: "Able to edit users"
				},
				{
					permissionName: "set_account_level_preferences",
					permissionDesc: "Able to set Account level preferences"
				},
				{
					permissionName: "view_account_reports",
					permissionDesc: "Able to view account reports"
				},
				{
					permissionName: "create_edit_topics",
					permissionDesc: "Able to create/edit topics"
				},
				{
					permissionName: "create_custom_entities",
					permissionDesc: "Able to create custom entities"
				},
				{
					permissionName: "apply_filters",
					permissionDesc: "Able to apply filters"
				},
				{
					permissionName: "drill_down_article",
					permissionDesc: "Able to drill down the article"
				},
				{
					permissionName: "export",
					permissionDesc: "Able to export the data"
				},
				{
					permissionName: "share_data_dashboards",
					permissionDesc: "Able to share the data & dashboards"
				},
				{
					permissionName: "access_eli",
					permissionDesc: "Access ELI"
				},
				{
					permissionName: "access_temp_editor_eli",
					permissionDesc: "Access Temporary Editor ELI"
				}]
			}
		},
		accountType: 0,
		brand: "attensity",
		expired: false,
		contactName: "TestContact",
		contactEmail: "test@attensity.com",		
		address: "123 Main Street",
		city: "Salt Lake City",
		state: "UT",
		zipCode: "84101",
		maxTopicLimit: 5,
		maxUserLimit: 5,
		maxVolumeLimit: 1000,
		userCount: 1,
		topicCount: 0,
		psOwner: "PS Personnel",
		accountStatus: "good",
		volume: 0,
		alertStatus: "NOT_PROCESSED",
		accountPermissions: [],
		accountLanguages: [
		{
			name: "English",
			abbreviation: "en"
		}]
	})
	.expectJSONTypes({
		expirationDate: Number,
		createDate: Number,
		id: Number})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of Create Account<<<<<=====')})		
		.afterJSON(function(json) {
		 var id = json.id



	//BACK OFFICE TESTSUITE//

	//require('./BO_API_TEST_ACCT_spec.js');
	//require('./BO_API_TEST_ACCTAUTH_spec.js');
	//require('./BO_API_TEST_ACCTAUTH_ADMIN_spec.js');
	//require('./BO_API_TEST_ACCTAUTH_EDITOR_spec.js');
	//require('./BO_API_TEST_ACCTAUTH_READONLY_spec.js');
	//require('./BO_API_TEST_ACCTAUTH_LOGIN_spec.js');
	
	//Account PARAM//
	require('./BO_API_TEST_EditAccountPost_spec.js');
	require('./BO_API_TEST_EditAccountPostLang_spec.js');
	require('./BO_API_TEST_EditAccountPostVol_spec.js');
	require('./BO_API_TEST_EditAccountPostMax25_spec.js');
	require('./BO_API_TEST_EditAccountPostMax30_spec.js');
	require('./BO_API_TEST_EditAccountPostMax35_spec.js');
	require('./BO_API_TEST_EditAccountPostMax40_spec.js');
	require('./BO_API_TEST_EditAccountPostMax50_spec.js');
	require('./BO_API_TEST_EditAccountPostMax60_spec.js');
	require('./BO_API_TEST_EditAccountPostMax70_spec.js');
	require('./BO_API_TEST_EditAccountPostMax80_spec.js');
	require('./BO_API_TEST_EditAccountPostMax90_spec.js');
	require('./BO_API_TEST_EditAccountPostMax100_spec.js');
	require('./BO_API_TEST_DeleteAccount_spec.js');

	
	
	
	//require('./BO_API_TEST_ACCTTERM_spec.js');
		}).toss();
}).toss();
