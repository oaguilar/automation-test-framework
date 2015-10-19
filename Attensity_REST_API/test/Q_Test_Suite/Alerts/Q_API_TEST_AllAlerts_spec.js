/* jasmine-node Q_API_TEST_AllAlerts_spec.js
   ARTSA-3859
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

    frisby.create('allAlerts')
		.get(xURL + accountAlerts + '/storedAlerts/allAlerts')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of allAlerts<<<<<=====')})
		.toss();