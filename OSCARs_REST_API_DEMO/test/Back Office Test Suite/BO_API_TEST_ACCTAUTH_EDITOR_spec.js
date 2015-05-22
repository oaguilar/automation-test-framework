/* jasmine-node Q_API_TEST_BOUSERAUTH_EDITOR_spec.js */
/* https://jira.attensity.com/browse/CO-42 */
var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var restAccount = configuration.restAccount;
var autoPassword = configuration.autoPassword;
var automationAccountID = configuration.automationAccountID;
var autoAccountName = configuration.autoAccountName;


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
		 
//Deletion of Editor User//
	frisby.create('User Editor Delete')
		.delete(BackofficeQA + restAccount + '/user/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Editor User Delete<<<<<=====')})
		.toss();
	}).toss();


