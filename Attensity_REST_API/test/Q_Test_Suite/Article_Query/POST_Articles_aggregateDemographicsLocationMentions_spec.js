/* jasmine-node POST_Articles_aggregateDemographicsLocationMentions_spec.js
   ARTSA-4970
   Updated on April 20, 2015 */

var frisby = require('frisby')
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

var sd = moment().subtract(14, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var xURL = configuration.xURL;
var restArticles = configuration.restArticles;
var topic = credentials.LongRunTopicID;

	frisby.create('POST Demographics - Location of Mentions')
		.post(xURL + restArticles + 'query/aggregate',
		{ topicIDs:[topic], 
		 limit:0,
		 filters:[],
		 dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields:[{"field":"author_country", "sortDirection":"ASCENDING"},{"field":"content_volume()", "sortDirection":"DESCENDING"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Demographics - Location of Mentions<<<<<=====')})
		.toss();
