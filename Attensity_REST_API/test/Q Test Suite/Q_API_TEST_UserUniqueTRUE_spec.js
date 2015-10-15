/* jasmine-node Q_API_TEST_UserUniqueTRUE_spec.js
   ARTSA-5000
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
	frisby.create('User Unique (TRUE)')
		.post(xURL + restUser +  '/user/unique',
		{
		  account: automationAccountID,
		  username: 'apirest'
		})
		.expectStatus(200)
		.expectJSON({unique: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of User Unique (TRUE)<<<<<=====')})
		.toss();