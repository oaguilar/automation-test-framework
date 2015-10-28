/* jasmine-node Q_API_TEST_UpdateTopicAlert_spec.js
   ARTSA-5013
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Update Topic Alert')
		.post(xURL + restTopic + '/update/alerts',
		{
		 id:id,topicAlerts:[{threshold:'LOW',alertActive:true, alertType:'VOLUME_ALERT', alertId:1421265518320, date:1421265518320}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Update Topic Alert<<<<<=====')})
		.toss();