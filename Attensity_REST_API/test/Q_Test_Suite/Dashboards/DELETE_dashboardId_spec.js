/* jasmine-node DELETE_dashboardId_spec.js
   ARTSA-3837
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

    frisby.create('DELETE dashboard ID')
		.delete(xURL + restDashboard + 'dashboards/'+ id)
		.expectStatus(204)
		.after(function() {console.log('=====>>>>>End Of DELETE dashboard ID<<<<<=====')})
		.toss();