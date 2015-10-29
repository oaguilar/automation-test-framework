/* jasmine-node POST_User_userAuth_spec.js 
   ARTSA-5071
   Updated on October 21, 2015 */

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

//Verifies Attensity Q Username & Password is valid; Login Failed = false// 	
    frisby.create('POST User Auth')
		.post(xURL + restUser +  'auth',
		{
		  username: Username,
		  password: Password,
		  accountName: AccountName
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST User Auth<<<<<=====')})
		.afterJSON(function(json) {
		var id = json.id
		//require('./Q_API_TEST_GET_UserAuthID_spec.js');
		//require('/Q_API_TEST_DELETE_UserAuthID_spec.js');
		}).toss();