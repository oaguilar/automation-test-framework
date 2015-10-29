/* jasmine-node Q_API_TEST_GET_DashboardTemplates_spec.js
   ARTSA-3834
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restDash = configuration.restDash;

    frisby.create('dashboard templates')
		.get(xURL + restDash + '/dashboards/templates')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard templates<<<<<=====')})
		.toss();
