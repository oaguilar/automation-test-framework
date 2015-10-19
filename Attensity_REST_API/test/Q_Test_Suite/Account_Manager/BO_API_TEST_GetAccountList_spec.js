/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var accountService = configuration.accountService;

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