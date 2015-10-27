/* jasmine-node Q_API_TEST_DismissAlert_spec.js
   ARTSA-5021
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

    frisby.create('dismissAlert')
		.put(xURL + accountAlerts + '/storedAlerts/dismissAlert/22')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of dismissAlert<<<<<=====')})
		.toss();