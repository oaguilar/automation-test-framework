/* jasmine-node Q_API_TEST_GET_UserID_spec.js 
   ARTSA-5066
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
var automationUserID = credentials.automationUserID;


    frisby.create('GET User ID')
		.get(xURL + restUser + '/user/' + automationUserID)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET User ID<<<<<=====')})
		.toss();