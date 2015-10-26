/* jasmine-node Q_API_TEST_QUSERAUTH_LOGIN_spec.js 
   ARTSA-4966
   Updated on October 21, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var fs, configurationFile;
	configurationFile = 'Q_credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	
	
var xURL = configuration.xURL;
var restUser = configuration.restUser;
var autoUsername = credentials.autoUsername;
var autoPassword = credentials.autoPassword;
var autoAccountName = credentials.autoAccountName;

//Verifies Attensity Q Username & Password is valid; Login Failed = false// 	
    frisby.create('Account User Valid Login')
		.post(xURL + restUser +  '/auth',
		{
		  username: autoUsername,
		  password: autoPassword,
		  accountName: autoAccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account User Valid Login<<<<<=====')})
		.toss();