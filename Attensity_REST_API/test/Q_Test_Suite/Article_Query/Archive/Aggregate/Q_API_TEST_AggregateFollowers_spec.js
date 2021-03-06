/* jasmine-node Q_API_TEST_AggregateFollowers_spec.js
   ARTSA-4972
   Updated on April 20, 2015 */

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
var xURL = configuration.xURL;
var restQuery = configuration.restQuery;
var topic = configuration.autoLongRunTopicID;
var START_DT = sm.unix();
var END_DT = em.unix();

	frisby.create('Aggregate - Followers')
		.post(xURL + restQuery + '/aggregate',
		{ topicIDs: [topic], 
		limit: 1,
		filters:[{"field":"article_content_subtype","comparison":"EQ","values":["twitter"]}],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"article_followers_sum","sortDirection":"DESCENDING"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Followers<<<<<=====')})
		.toss();