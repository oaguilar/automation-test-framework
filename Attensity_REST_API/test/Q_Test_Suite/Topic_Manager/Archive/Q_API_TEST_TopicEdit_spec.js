/* jasmine-node Q_API_TEST_TopicEdit_spec.js
   ARTSA-4989
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

require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('Topic Edit')
		.post(xURL + restTopic,
		{
			id: id,
			name: 'myTopicEdit',
			jsonDefinition: {
				includeAll: [],
				includeAny: [
					{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'super',
						alias: 'KEYWORD'
					},
					{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'day',
						alias: 'KEYWORD'
					}
				],
				exclude: [],
				exactPhrases: [],
				other: [
					{
						type: 'lang',
						values: [
							'en'
						]
					},
					{
						type: 'content_subtype',
						values: [
							'twitter'
						]
					}	
				],
		   results:{}
			}
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Edit<<<<<=====')})
		.toss();