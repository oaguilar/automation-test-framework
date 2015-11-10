/* jasmine-node GET_Account_accountAuthSession_spec.js */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;

	frisby.create('GET Account Auth Session')
	.get(xBO_AUTH_URL + restAccount + 'account')
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({
/* 			username: String,
			account: Number,
			enabled: Boolean,
			accountAdminUser: Boolean,
			loginFailed: Boolean,
			id: Number,
			authkey: String,
			accountType: Number,
			expirationDate: Number,
			maxTopicLimit: Number */
		})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Account Auth Session<<<<<=====')})
		.toss();