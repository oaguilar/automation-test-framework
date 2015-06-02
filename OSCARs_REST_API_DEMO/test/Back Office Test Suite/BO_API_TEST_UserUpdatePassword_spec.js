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

//Udates User's Password//	
    frisby.create('User Update Password')
		.post(BackofficeQA + restAccount + '/user',		
		{
			account: automationAccountID,
            oldpassword: 'P@ssword1',
			id: id,
			password: 'P@ssword2',
			updatePassword: true
		})
		.expectStatus(200)
		.expectJSON({password: 'P@ssword2'})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Update Password<<<<<=====')})
		.toss();		 