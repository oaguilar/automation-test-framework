/* jasmine-node Q_API_TEST_TopicDashboards_spec.js
   ARTSA-4260
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
require('../Q_API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('topic-dashboards')
		.get(xURL + restDash + '/dashboards/topic-dashboards/' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of topic-dashboards<<<<<=====')})
		.toss();