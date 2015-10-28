/* jasmine-node POST_Topic_topicSanityChecker_spec.js
   ARTSA-4994
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

    frisby.create('POST Topic Sanity Checker')
		.post(xURL + restTopic + 'topic/sanity',
		{ 		
			jsonDefinition: {
					includeAll: [],
					includeAny: [
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'day',
							alias: 'KEYWORD'
						},
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'super',
							alias: 'KEYWORD'
						},
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'super',
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
								'Twitter'
							]
						}	
					],
			   results:{}
				}
			})
		.expectStatus(200)
		.inspectJSON()
		.expectJSONLength(2)
		.after(function() {console.log('=====>>>>>End Of POST Topic Sanity Checker<<<<<=====')})
		.toss();