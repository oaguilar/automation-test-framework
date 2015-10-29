/* jasmine-node Q_API_TEST_UsernameInvalid_spec.js
   ARTSA-4998
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

//Verifies Username is invalid; Login Failed = true// 	
    frisby.create('Username Invalid')
		.post(xURL + restUser +  '/auth',
		{
		  username: 'invalidusername',
		  password: autoPassword,
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Username Invalid<<<<<=====')})
		.toss();