/* jasmine-node DELETE_Dashboard_dashboardTemplate_spec.js
   ARTSA-5187
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
require('./POST_Dashboard_dashboardTemplates_spec.js');
var id = json

    frisby.create('dashboard template Delete')
		.delete(xURL + restDashboard + 'dashboards/templates/'+ id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard template Delete<<<<<=====')})
		.toss();