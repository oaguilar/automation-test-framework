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
require('./BO_API_TEST_UserAdminCreateNew_spec.js')
		 var id = json.id
		 var username = json.username
		 var account = json.account
		 var name = json.name

	//Updates User's Email//		
    frisby.create('User Update Email')
		.post(BackofficeQA + restAccount + '/user',		
		{
			id: json.id,
			email: 'restapi.1@attensity.com'
		})
		.expectStatus(200)
		.expectJSON({email: 'restapi.1@attensity.com'})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Email<<<<<=====')})
		.toss();
