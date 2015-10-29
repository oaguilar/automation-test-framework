/* jasmine-node GET_Dashboard_dashboardId_spec.js
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
require('./POST_Dashboard_createDashboard_spec.js');
var id = json

    frisby.create('GET dashboard ID')
		.get(xURL + restDashboard + 'dashboards/' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET dashboard ID<<<<<=====')})
		.toss();