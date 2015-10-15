/* jasmine-node Q_API_TEST_PasswordInvalid_spec.js
   ARTSA-4984
   https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;
var automationAccountID = configuration.automationAccountID;

//Verifies Password is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(xURL + restUser +  '/auth',
		{
		  username: autoUsername,
		  password: 'InvalidPassword',
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Password Invalid<<<<<=====')})
		.toss();