/* jasmine-node POST_User_userUniqueFALSE_spec.js
   ARTSA-4999
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
var AccountID = credentials.AccountID;

//Create “FALSE” Unique Username//	 
	frisby.create('POST User Unique (FALSE)')
		.post(xURL + restUser +  'user/unique',
		{
		  account: AccountID,
		  username: Username
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST User Unique (FALSE)<<<<<=====')})
		.toss();