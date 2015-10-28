/* jasmine-node GET_Alerts_Account Alerts_spec.js
   ARTSA-5018
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restAlerts = configuration.restAlerts;

    frisby.create('accountAlerts')
		.get(xURL + restAlerts + 'storedAlerts/accountAlerts')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of accountAlerts<<<<<=====')})
		.toss();