/* jasmine-node Q_API_TEST_TopicNameNOTUnique_spec.js
   ARTSA-4992
   Updated on April 20, 2015 */

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


    frisby.create('Topic Name NOT Unique')
		.post(xURL + restTopic + '/unique',
		{
			name:'Topic Create through API NODE.JS'
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Name NOT Unique<<<<<=====')})
		.toss();