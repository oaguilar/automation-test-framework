/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */
//This test creates an edits an account repeatedly, testing all supported accountType, accountLanguage, maxTopicLimit, and maxTopicVolume values.

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var BackofficeQA = configuration.BackofficeQA;
var accountAuthService = configuration.accountAuthService;
var accountService = configuration.accountService;
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;
var usernameVal = configuration.usernameVal;
var passwordVal = configuration.passwordVal;
var invalidUserName = configuration.invalidUserName;
var invalidPassword = configuration.invalidPassword;
var BackofficeQA = configuration.BackofficeQA;
require('./BCKOFFC_API_TESTSUITE_spec.js');
var id = json.id

		
	
	
	
	
	
		


	
	



	

	

	



			




	

