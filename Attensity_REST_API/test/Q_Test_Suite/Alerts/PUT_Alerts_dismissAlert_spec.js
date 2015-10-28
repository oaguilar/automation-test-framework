/* jasmine-node PUT_Alerts_dismissAlert_spec.js
   ARTSA-5021
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

    frisby.create('PUT dismissAlert')
		.put(xURL + restAlerts + 'storedAlerts/dismissAlert/22')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of PUT dismissAlert<<<<<=====')})
		.toss();