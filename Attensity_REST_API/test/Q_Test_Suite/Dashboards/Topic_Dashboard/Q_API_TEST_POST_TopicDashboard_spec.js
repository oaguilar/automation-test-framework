/* jasmine-node Q_API_TEST_Dashboard_spec.js
   ARTSA-3835
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

    frisby.create('dashboard')
		.post(xURL + restDash + '/dashboards/topic-dashboards/102580',
	{
    topicId: 102580,
    jsonDefinition: '[{"id":1700,"name":"tititabonita3","widgets":[{"directive":"overview-bar","attrs":"mini","col":1,"row":1,"size_x":2,"size_y":2}]]'
	})
		.expectStatus(204)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard<<<<<=====')})
		.afterJSON(function(json) {
		 var id = id
		 }).toss();
