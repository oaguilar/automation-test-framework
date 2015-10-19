/* jasmine-node Q_API_TEST_HideAlert_spec.js
   ARTSA-3861
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

    frisby.create('hideAlert')
		.put(xURL + accountAlerts + '/storedAlerts/hideAlert/22')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of hideAlert<<<<<=====')})
		.toss();