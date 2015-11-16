/* jasmine-node POST_User_userAuthId_spec.js 
   ARTSA-5206
   Updated on Novemember 12, 2015 */

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
var UserID = credentials.UserID

//Verifies Attensity Q Username & Password is valid; Login Failed = false// 	
    frisby.create('POST User Auth ID')
		.post(xURL + restUser +  'auth/' + UserID,
		{
		  username: Username,
		  password: Password,
		  accountName: AccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST User Auth ID<<<<<=====')})
		.toss();