/* jasmine-node GET_Topic_topicAlerts_spec.js
   ARTSA-5016
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restTopic = configuration.restTopic;

    frisby.create('GET topicAlerts')
		.get(xURL + restTopic + 'topic/alerts/102614')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET topicAlerts<<<<<=====')})
		.toss();