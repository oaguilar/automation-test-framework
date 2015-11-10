/* jasmine-node GET_Account_accountUsers_spec.js */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;
var AccountID = credentials.AccountID;

frisby.create('GET AccountUsers')
//Retrieves list of users for a specified account
	.get(xBO_AUTH_URL + restAccount + 'account/' + AccountID)
	.expectStatus(200)
	.expectJSONTypes(
/* 	[{
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
	}] */
)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Account Users<<<<<=====')})
	.toss();