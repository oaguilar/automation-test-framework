/* jasmine-node GET_Dashboard_topicDashboardId_spec.js
   ARTSA-4260
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

    frisby.create('GET topic-dashboard ID')
		.get(xURL + restDashboard + 'dashboards/topic-dashboards/' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET topic-dashboard ID<<<<<=====')})
		.toss();