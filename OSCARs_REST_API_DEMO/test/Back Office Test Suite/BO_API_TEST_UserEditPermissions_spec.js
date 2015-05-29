/* jasmine-node Q_API_TEST_BOUSERAUTH_ADMIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var automationAccountID = configuration.automationAccountID;
var autoAccountName = configuration.autoAccountName;
var restAccount = configuration.restAccount;
var passwordAccount = configuration.passwordAccount;
require('./BCKOFFC_API_TESTSUITE_spec.js');
		 var id = json.id
		 var username = json.username
		 var account = json.account
		 var name = json.name

//Edits Admin Role to Editor Role//	
    frisby.create('User Edit Permissions')
		.post(BackofficeQA + restAccount + '/user',	
		{
			id: id,
			account: automationAccountID,
			accountName: autoAccountName,
			username: username,
			enabled: true,
			accountType: 0,
			brandName: 'attensity',
			userRole: {
						roleName: 'editor'
					  },
			preferences: {
							timeZoneString: 'America/New_York',
							timeZoneOffset: -14400000
						 }
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Edit Permissions<<<<<=====')})
		.toss();