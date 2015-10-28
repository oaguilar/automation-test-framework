/* jasmine-node POST_Articles_aggregateDemographicsLocationDrillDown_spec.js
   ARTSA-4969
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

	frisby.create('POST Aggregate - Demographics - Location - DrillDown')
		.post(xURL + restArticles + 'query/aggregate',
		{ topicIDs: [topic], 
		limit: 0,
		filters:[{"field":"author_country","comparison":"CO_OCCURS","values":["us"]}],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [
			{"field":"author_country","sortDirection":"ASCENDING"},
			{"field":"author_state","sortDirection":"ASCENDING"},
			{"field":"content_volume()","sortDirection":"DESCENDING"}
			]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Aggregate - Demographics - Location - DrillDown<<<<<=====')})
		.toss();
		