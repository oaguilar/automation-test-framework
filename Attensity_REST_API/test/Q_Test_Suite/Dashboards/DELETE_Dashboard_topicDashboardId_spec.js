/* jasmine-node DELETE_Dashboard_topicDashboardId_spec.js
   ARTSA-5184
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
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('DELETE dashboard ID')
		.delete(xURL + restDashboard + 'dashboards/topic-dashboards/' + id)
		.expectStatus(204)
		.after(function() {console.log('=====>>>>>End Of DELETE dashboard ID<<<<<=====')})
		.toss();