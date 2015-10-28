/* jasmine-node Q_API_TEST_TopicReport_spec.js
   ARTSA-5012
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
var topic = configuration.autoLongRunTopicID;

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Topic Report')
		.get(xURL + restTopic + '/topicreport')  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Report<<<<<=====')})
		.toss();