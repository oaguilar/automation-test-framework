/* jasmine-node Q_API_TEST_AlertTypes_spec.js
   ARTSA-5019
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

    frisby.create('alertTypes')
		.get(xURL + accountAlerts + '/storedAlerts/alertTypes')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of alertTypes<<<<<=====')})
		.toss();