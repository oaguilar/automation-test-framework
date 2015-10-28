/* jasmine-node PUT_ALerts_hideAlert_spec.js
   ARTSA-5015
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

    frisby.create('PUT hideAlert')
		.put(xURL + restAlerts + 'storedAlerts/hideAlert/22')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of PUT hideAlert<<<<<=====')})
		.toss();