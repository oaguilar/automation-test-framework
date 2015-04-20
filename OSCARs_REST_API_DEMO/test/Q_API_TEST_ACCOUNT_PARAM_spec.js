/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */
//This test creates an edits an account repeatedly, testing all supported accountType, accountLanguage, maxTopicLimit, and maxTopicVolume values.

var frisby = require('frisby')
var URL = 'http://stage-q01.attensity.com:8080'
var accountService = 'SaasCoreAccountManager/rest/account'
var accountAuthService = 'SaasCoreAccountManager/rest/accountauth'
var accountUserService = 'SaasCoreAccountManager/rest/user/account'
var accountUniqueService = 'SaasCoreAccountManager/rest/account/unique'
var usernameVal = 'account'
var passwordVal = 'account'

	frisby.create('AccountAuthentication')
	//authenticates the user to Account Manager
		.post(URL + '/' + accountAuthService,
		{username : usernameVal, password: passwordVal},
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
		timeout: (400 * 1000 )   
		});

frisby.create('Create Account')
//Creates a new account
	.post(URL + '/' + accountService, {
		id: -1,
		name: 'FrisbyTestAccount',
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
		name: 'FrisbyTestAccount',
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
		
frisby.create('Edit Account Post')
//Edits an existing account using Post 
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		accountType: 1,
		accountLanguages:[{name: "English", abbreviation: "en"},{name: "French", abbreviation: "fr"}],
		maxVolumeLimit: 5000,
		maxTopicLimit: 10,
		maxUserLimit: 1
	})
	.expectStatus(200)
	.expectJSON({
		accountType: 1,
		maxVolumeLimit: 5000,
		maxTopicLimit: 10,
		maxUserLimit: 1,
		accountLanguages: [
		{
			name: "English",
			abbreviation: "en"
		},
		{
			name: "French",
			abbreviation: "fr"
		}]
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		accountLanguages:[{name: "English", abbreviation: "en"},{name: "French", abbreviation: "fr"}, {name: "German", abbreviation: "de"}],
		accountType: 2,
		maxVolumeLimit: 10000,
		maxTopicLimit: 15,
		maxUserLimit: 25
	})
	.expectStatus(200)
	.expectJSON({
		accountType: 2,
		maxVolumeLimit: 10000,
		maxTopicLimit: 15,
		maxUserLimit: 25,
		accountLanguages: [
		{
			name: "English",
			abbreviation: "en"
		},
		{
			name: "French",
			abbreviation: "fr"
		},
		{
			name: "German",
			abbreviation: "de"
		}]
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		accountLanguages:[{name: "English", abbreviation: "en"},{name: "French", abbreviation: "fr"}, {name: "German", abbreviation: "de"},{name: "Spanish", abbreviation: "es"}],
		accountType: 3,
		maxVolumeLimit: 20000,
		maxTopicLimit: 20
	})
	.expectStatus(200)
	.expectJSON({
		accountType: 3,
		maxVolumeLimit: 20000,
		maxTopicLimit: 20,
		accountLanguages: [
		{
			name: "English",
			abbreviation: "en"
		},
		{
			name: "French",
			abbreviation: "fr"
		},
		{
			name: "German",
			abbreviation: "de"
		},
		{
			name: "Spanish",
			abbreviation: "es"
		}]
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		
	
frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		accountType: 4,
		maxVolumeLimit: 40000,
		maxTopicLimit: 25
	})
	.expectStatus(200)
	.expectJSON({
		accountType: 4,
		maxVolumeLimit: 40000,
		maxTopicLimit: 25
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		
	
frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxVolumeLimit: 80000,
		maxTopicLimit: 30
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 80000,
		maxTopicLimit: 30
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		
	
frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxVolumeLimit: 160000,
		maxTopicLimit: 35
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 160000,
		maxTopicLimit: 35
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxVolumeLimit: 320000,
		maxTopicLimit: 40
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 320000,
		maxTopicLimit: 40
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		
	
frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxVolumeLimit: 640000,
		maxTopicLimit: 45
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 640000,
		maxTopicLimit: 45
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 50
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 50
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 60
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 60
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 70
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 70
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 80
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 80
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id		

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 90
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 90
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id	

frisby.create('Edit Account Post')
//Edits an existing account using Post
	.post(URL + '/' + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		maxTopicLimit: 100
	})
	.expectStatus(200)
	.expectJSON({
		maxTopicLimit: 100
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Post<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id				

frisby.create('Delete Account')
//Deletes account created during test
	.delete(URL + '/' + accountService + '/' + json.id)
	.expectStatus(200)
	.after(function() {console.log('=====>>>>>End Of Delete Account<<<<<=====')})
	.toss();
	}).toss();
	}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();
		}).toss();