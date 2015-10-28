/* jasmine-node GET_Alerts_alertTypes_spec.js
   ARTSA-5019
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

    frisby.create('GET alertTypes')
		.get(xURL + restAlerts + 'storedAlerts/alertTypes')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET alertTypes<<<<<=====')})
		.toss();