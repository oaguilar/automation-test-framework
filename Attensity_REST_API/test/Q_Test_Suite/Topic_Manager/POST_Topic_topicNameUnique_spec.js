/* jasmine-node POST_Topic_topicNameUnique_spec.js
   ARTSA-4993
   Updated on April 20, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;

    frisby.create('POST Topic Name Unique')
		.post(xURL + restTopic + 'topic/unique',
		{
			name:'1 american idol'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Topic Name Unique<<<<<=====')})
		.toss();