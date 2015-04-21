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
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
	 });
	
    frisby.create('User Create New (VALID PASSWORD)')
		.post('http://stage-q01.attensity.com:8080/SaasCoreAccountManager/rest/user',	
{
	username: 'frisbyuser',
	email: 'oaguilar@attensity.com',
	password: 'P@ssword1',
	account: 10020,
	enabled: true,
	accountAdminUser: false,
	loginFailed: false,
	id: -1,
	accountName: 'qabeta',
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
		.after(function() {console.log('=====>>>>>End Of User Create New (VALID PASSWORD)<<<<<=====')})
		.afterJSON(function(json) {
		 var account = json.account
		 var id = json.id
		 var accountName = json.accountName
		var username = json.username})
		.toss();
		}).toss();