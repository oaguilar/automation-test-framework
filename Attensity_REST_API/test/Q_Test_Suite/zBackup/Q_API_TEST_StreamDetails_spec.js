/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var sd = moment().subtract(14, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var QQA = configuration.QQA;
var restQuery = configuration.restQuery;
var topic = configuration.autoLongRunTopicID;

	frisby.create('Stream Details')
		.post(QQA + restQuery + '/details',
		{ topicIDs:[topic], 
		 limit:LIMIT,
         selectedFields:[
		 {field:'article_published_at', sortDirection: 'DESCENDING'},
			{field:'article_publisher'},
			{field:'article_screen_name'},
			{field:'article_title'},
			{field:'article_topic'},
			{field:'article_uri'},
			{field:'article_content_subtype'},
			{field:'article_content_type'},
			{field:'author_name'},
			{field:'author_image_url'},
			{field:'body'},
			{field:'article_followers'},
			{field:'article_klout'},
			{field:'article_language'},
			{field:'article_sentiment'},
			{field:'article_id'},
			{field:'pipeline_article_id'}],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		timeSlice:'HOUR'})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Stream Details<<<<<=====')})
		.toss();