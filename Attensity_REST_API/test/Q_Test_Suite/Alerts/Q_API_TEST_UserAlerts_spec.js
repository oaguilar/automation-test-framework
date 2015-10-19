/* jasmine-node Q_API_TEST_Account_User_spec.js
   ARTSA-3858
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var accountAlerts = configuration.accountAlerts;

    frisby.create('userAlerts')
		.get(xURL + accountAlerts + '/storedAlerts/userAlerts')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of userAlerts<<<<<=====')})
		.toss();