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
var accountUserService = configuration.accountUserService;
var automationAccountID = configuration.automationAccountID;

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