/* jasmine-node GET_Dashboard_dashboardsIncludeWidgets_spec.js
   ARTSA-4270
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restDashboard = configuration.restDashboard;

    frisby.create('GET dashboardsIncludeWidgets')
		.get(xURL + restDashboard + 'dashboards/includeWidgets')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET dashboardsIncludeWidgets <<<<<=====')})
		.toss();