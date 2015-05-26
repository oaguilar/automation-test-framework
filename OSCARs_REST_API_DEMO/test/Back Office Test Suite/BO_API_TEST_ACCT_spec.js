/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;
var BackofficeQA = configuration.BackofficeQA;
var accountService = configuration.accountService;
var accountAuthService = configuration.accountAuthService;
var accountUserService = configuration.accountUserService;
var accountUniqueService = configuration.accountUniqueService;
var automationAccountID = configuration.automationAccountID;

frisby.create('GetAccountList')
//Retrieves list of all accounts
	.get(BackofficeQA + accountService)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			id: Number,
			name: String,
			accountType: Number,
			brand: String,
			expirationDate: Number,
			expired: Boolean,
			contactName: String,
			contactEmail: String,
			city: String,
			state: String,
			maxTopicLimit: Number,
			maxUserLimit: Number,
			maxVolumeLimit: Number,
			userCount: Number,
			topicCount: Number,
			createDate: Number,
			accountStatus: String,
			volume: Number,
			alertStatus: String,
			accountPermissions:Array,
			accountLanguages: Array
		}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account List<<<<<=====')})
	.toss();
	
frisby.create('GetAccountReport')
//Retrieves Account Management Report
	.get(BackofficeQA + accountService  + '/' + "accountreport")
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			accountId: Number,
			accountName: String,
			accountType: String,
			owner: String,
			ownerEmail: String,
			age: Number,
			requestDate: Number,
			expiryDate: Number,
			brand: String,
			notes: String,
			maxVolumeLimit: Number,
			maxTopicLimit: Number,
			currentTopicCount: Number,
			maxUserLimit: Number,
			currentUserCount: Number,
			status: String
		}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account Report<<<<<=====')})
	.toss();
		
frisby.create('GetAccountType')
//Retrieves list of the types of all current accounts
	.get(BackofficeQA + accountService + '/' + "accountInfo")
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			id: Number,
			accountType: String}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account Type<<<<<=====')})
	.toss();

frisby.create('GetAccountBrandList')
//Retrieves list of all account brands
	.get(BackofficeQA + '/' + accountService + '/brands')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of Get Account Brand List<<<<<=====')})
	.toss();
	
frisby.create('Create Account')
//Creates a new account
	.post(BackofficeQA + accountService, {
		id: -1,
		name: 'FrisbyTestAccount',
		accountType: 0,
		accountPermissions: [],
		accountLanguages:[{name: 'English', abbreviation: 'en'}],
		maxVolumeLimit: 80000,
		maxUserLimit: 5,
		maxTopicLimit: 15,
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
		maxTopicLimit: 15,
		maxUserLimit: 5,
		maxVolumeLimit: 80000,
		userCount: 1,
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
	.post(BackofficeQA + accountService, {
		id: json.id,
		name: "FrisbyTestAccountEdited",
		accountLanguages:[{name: "English", abbreviation: "en"},{name: "French", abbreviation: "fr"}],
		maxVolumeLimit: 160000,
		maxTopicLimit: 35
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 160000,
		maxTopicLimit: 35,
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
	.toss();
	
frisby.create('Edit Account Put')
//Edits an existing account using put
	.put(BackofficeQA + accountService + '/' + json.id, {
		maxVolumeLimit: 1000,
		maxUserLimit: 10,
		maxTopicLimit: 10
	})
	.expectStatus(200)
	.expectJSON({
		maxVolumeLimit: 1000,
		maxUserLimit: 10,
		maxTopicLimit: 10
	})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Edit Account Put<<<<<=====')})		
	.afterJSON(function(json) {
	var id = json.id	

/*frisby.create('Account Name Not Unique') Currently commented out subsequent to ART-3027, will add test back once resolved
//Checks to see if account name is unique when sending duplicate name
	.post(URL + '/' + accountUniqueService, {
		name: "Attensity"
	})
	.expectStatus(200)
	.expectJSON({
		unique: false
		})
	//.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Account Name Not Unique<<<<<=====')})
	.toss();	
	
frisby.create('Account Name Unique')
//Checks to see if account name is unique when sending unique name
	.post(URL + '/' + accountUniqueService, {
		name: "4321578Jsifjelsie"
	})
	.expectStatus(200)
	.expectJSON({
		unique: true
		})
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Account Name Unique<<<<<=====')})
	.toss();*/

frisby.create('GetAccountUsers')
//Retrieves list of users for a specified account
	.get(BackofficeQA + accountUserService + '/' + automationAccountID)
	.expectStatus(200)
	.expectJSONTypes([{
		username: String,
		email: String,
		apikey: String,
		account: Number,
		enabled: Boolean,
		accountAdminUser: Boolean,
		loginFailed: Boolean,
		id: Number,
		preferences: {
			timeZoneString: String,
			timeZoneOffset: Number
		},
		accountType: Number,
		expirationDate: Number,
		userRole: {
			id: Number,
			description: String,
			roleName: String,
			userPermissions: Array
		},
		maxTopicLimit: Number
	}]
)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Account Users<<<<<=====')})
	.toss();	
	
frisby.create('Delete Account')
//Deletes account created during test
	.delete(BackofficeQA + accountService + '/' + json.id)
	.expectStatus(200)
	.after(function() {console.log('=====>>>>>End Of Delete Account<<<<<=====')})
	.toss();
	
frisby.create('Verify Account Deleted')
//Tries to retrieve deleted account (expected to fail)
.get(BackofficeQA + accountService + '/' + json.id)
.expectStatus(500)
.after(function(){console.log('============End of Verify Account Deleted========')})
	.toss();
	}).toss();
	}).toss();

