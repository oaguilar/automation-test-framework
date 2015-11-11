/* jasmine-node GET_Account_accountReport_spec.js
	ARTSA-5163
*/

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

frisby.create('GET AccountReport')
//Retrieves Account Management Report
	.get(xBO_AUTH_URL + restAccount + 'account/accountreport')
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
	.after(function() {console.log('=====>>>>>End Of GET Account Report<<<<<=====')})
	.toss();