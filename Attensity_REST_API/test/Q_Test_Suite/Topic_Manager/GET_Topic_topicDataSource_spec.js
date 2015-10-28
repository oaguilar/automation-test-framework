/* jasmine-node GET_Topic_topicDataSource_spec.js
   ARTSA-5008
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

frisby.create('GET Topic DataSources')
//Retrieves Topic Datasources
	.get(xURL + restTopic + 'topic/datasources/')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Topic DataSources<<<<<=====')})
	.toss();