/* jasmine-node POST_User_invalidUserPassword_spec.js
   ARTSA-4984
   https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby')
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

var xURL = configuration.xURL;
var restUser = configuration.restUser;
var Username = credentials.Username;
var Password = credentials.Password;
var AccountName = credentials.AccountName;
var AccountID = credentials.AccountID;

//Verifies Password is invalid; Login Failed = true// 	
    frisby.create('POST Password Invalid')
		.post(xURL + restUser +  'auth',
		{
		  username: Username,
		  password: 'InvalidPassword',
		  accountName: AccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Password Invalid<<<<<=====')})
		.toss();