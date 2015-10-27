/* jasmine-node Q_API_TEST_TopicAlerts_spec.js
   ARTSA-5016
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restTopic = configuration.restTopic;

    frisby.create('topicAlerts')
		.get(xURL + restTopic + '/alerts/102614')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of topicAlerts<<<<<=====')})
		.toss();