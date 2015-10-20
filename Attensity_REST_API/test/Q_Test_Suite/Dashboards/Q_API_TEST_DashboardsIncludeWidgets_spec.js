/* jasmine-node Q_API_TEST_DashboardsIncludeWidgets_spec.js
   ARTSA-4270
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

    frisby.create('dashboardsIncludeWidgets')
		.get(xURL + restDash + '/dashboards/includeWidgets')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboardsIncludeWidgets <<<<<=====')})
		.toss();