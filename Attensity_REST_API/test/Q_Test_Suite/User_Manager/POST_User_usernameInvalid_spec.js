/* jasmine-node POST_User_usernameInvalid_spec.js
   ARTSA-4998
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

//Verifies Username is invalid; Login Failed = true// 	
    frisby.create('POST Username Invalid')
		.post(xURL + restUser +  'auth',
		{
		  username: 'invalidusername',
		  password: Password,
		  accountName: AccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Username Invalid<<<<<=====')})
		.toss();