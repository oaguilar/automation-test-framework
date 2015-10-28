/* jasmine-node GET_Alerts_allAlerts_spec.js
   ARTSA-5020
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

    frisby.create('allAlerts')
		.get(xURL + restAlerts + 'storedAlerts/allAlerts')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of allAlerts<<<<<=====')})
		.toss();