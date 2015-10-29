/* jasmine-node POST_Dashboard_dashboardId_spec.js
   ARTSA-3835
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

    frisby.create('POST dashboard ID')
		.post(xURL + restDashboard + 'dashboards/topic-dashboards/' + id,
	{
    topicId: id,
    jsonDefinition: '[{"id":1700,"name":"tititabonita3","widgets":[{"directive":"overview-bar","attrs":"mini","col":1,"row":1,"size_x":2,"size_y":2},{"directive":"article-stream","col":1,"row":3,"size_x":2,"size_y":10}],"editName":null} ]'
	})
		.expectStatus(204)
		.after(function() {console.log('=====>>>>>End Of POST dashboard ID<<<<<=====')})
		.toss();
