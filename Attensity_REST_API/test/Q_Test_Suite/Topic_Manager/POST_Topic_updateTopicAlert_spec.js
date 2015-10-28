/* jasmine-node POST_Topic_updateTopicAlert_spec.js
   ARTSA-5013
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('../API_TESTSUITE_spec.js');
var id = json.id

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('POST Update Topic Alert')
		.post(xURL + restTopic + 'topic/update/alerts',
		{
		 id:id,topicAlerts:[{threshold:'LOW',alertActive:true, alertType:'VOLUME_ALERT', alertId:1421265518320, date:1421265518320}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Update Topic Alert<<<<<=====')})
		.toss();