/* jasmine-node Q_API_TEST_AggregateSentimentRatio_spec.js
   ARTSA-4977
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
var START_DT = sm.unix()
var END_DT = em.unix()

	frisby.create('Aggregate - Sentiment Ratio')
		.post(xURL + restQuery + '/aggregate',
		{ topicIDs: [topic], 
		limit: 10,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields:[
		{'field':'article_sentiment', 'sortDirection': 'ASCENDING'},
		{'field':'content_volume()', 'sortDirection':'DESCENDING'}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Sentiment Ratio<<<<<=====')})
		.toss();