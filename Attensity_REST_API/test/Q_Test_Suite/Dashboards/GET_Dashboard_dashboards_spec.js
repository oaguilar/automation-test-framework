/* jasmine-node GET_Dashboard_dashboards_spec.js
   ARTSA-3833
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

    frisby.create('GET dashboards')
		.get(xURL + restDashboard + 'dashboards')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET dashboards<<<<<=====')})
		.toss();