/* jasmine-node Q_API_TEST_UserUniqueFALSE_spec.js
   ARTSA-4999
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

//Create “FALSE” Unique Username//	 
	frisby.create('User Unique (FALSE)')
		.post(xURL + restUser +  '/user/unique',
		{
		  account: automationAccountID,
		  username: autoUsername
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (FALSE)<<<<<=====')})
		.toss();