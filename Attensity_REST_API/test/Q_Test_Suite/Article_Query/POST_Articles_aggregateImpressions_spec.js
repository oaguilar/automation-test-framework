/* jasmine-node POST_Articles_aggregateImpressions_spec.js
   ARTSA-4973
   Updated on April 20, 2015 */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	

var sd = moment().subtract(37, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var LIMIT = 10
var xURL = configuration.xURL;
var restArticles = configuration.restArticles;
var topic = credentials.LongRunTopicID;
var START_DT = sm.unix();
var END_DT = em.unix();

	frisby.create('POST Aggregate - Impressions')
		.post(xURL + restArticles + 'query/aggregate',
		{ topicIDs: [topic], 
		limit: 1,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"article_impressions","sortDirection":"DESCENDING"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Aggregate - Impressions<<<<<=====')})
		.toss();