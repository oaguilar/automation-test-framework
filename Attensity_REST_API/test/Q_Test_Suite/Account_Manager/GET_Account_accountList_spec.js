/* jasmine-node GET_Account_accountList_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;

frisby.create('GET Account List')
//Retrieves list of all accounts
	.get(xBO_AUTH_URL +  restAccount + 'account')
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
	.after(function() {console.log('=====>>>>>End Of GET Account List<<<<<=====')})
	.toss();