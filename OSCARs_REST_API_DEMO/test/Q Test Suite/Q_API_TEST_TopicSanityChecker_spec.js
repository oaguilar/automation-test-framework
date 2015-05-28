/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var sd = moment().subtract(37, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var LIMIT = 10
var QQA = configuration.QQA;
var restQuery = configuration.restQuery;
var restTopic = configuration.restTopic;
var topic = configuration.autoLongRunTopicID;
var START_DT = sm.unix();
var END_DT = em.unix();

    frisby.create('Topic Sanity Checker')
		.post(QQA + restTopic + '/sanity',
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
						}
					],
			   results:{}
				}
			})
		.expectStatus(200)
		.inspectJSON()
		.expectJSONLength(2)
		.after(function() {console.log('=====>>>>>End Of Topic Sanity Checker<<<<<=====')})
		.toss();