/* jasmine-node Q_API_TEST_QUSERAUTH_LOGIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QQA = configuration.QQA;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;
var automationAccountID = configuration.automationAccountID;

//Verifies Password is invalid; Login Failed = true// 	
    frisby.create('Password Invalid')
		.post(QQA + restUser +  '/auth',
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