/* jasmine-node Q_API_TEST_BOUSERAUTH_ADMIN_spec.js */
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
		.toss();
		