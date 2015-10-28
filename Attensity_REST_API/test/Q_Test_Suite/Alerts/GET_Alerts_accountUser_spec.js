/* jasmine-node GET_Alerts_accountUser_spec.js
   ARTSA-5017
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

    frisby.create('GET userAlerts')
		.get(xURL + restAlerts + 'storedAlerts/userAlerts')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET userAlerts<<<<<=====')})
		.toss();