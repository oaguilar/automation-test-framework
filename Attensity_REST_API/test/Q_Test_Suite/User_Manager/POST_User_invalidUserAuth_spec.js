
/* jasmine-node POST_User_invalidUserAuth_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

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

//Verifies Account is invalid; Login Failed = true// 	
    frisby.create('POST Invalid User')
		.post(xURL + restUser +  'auth',
		{
		  username: Username,
		  password: Password,
		  accountName: 'Invalidaccount'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Invalid User<<<<<=====')})
		.toss();