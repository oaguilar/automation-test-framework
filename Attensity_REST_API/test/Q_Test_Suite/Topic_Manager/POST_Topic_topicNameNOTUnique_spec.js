/* jasmine-node POST_Topic_topicNameNOTUnique_spec.js
   ARTSA-4992
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

    frisby.create('POST Topic Name NOT Unique')
		.post(xURL + restTopic + 'topic/unique',
		{
			name:'myCustomerData2'
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Topic Name NOT Unique<<<<<=====')})
		.toss();