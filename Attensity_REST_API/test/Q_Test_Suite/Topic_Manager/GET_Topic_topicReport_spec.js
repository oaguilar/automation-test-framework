/* jasmine-node GET_Topic_topicReport_spec.js
   ARTSA-5012
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

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('GET Topic Report')
		.get(xURL + restTopic + 'topic/topicreport')  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Topic Report<<<<<=====')})
		.toss();