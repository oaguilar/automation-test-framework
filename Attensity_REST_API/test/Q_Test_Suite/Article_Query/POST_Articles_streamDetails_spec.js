/* jasmine-node POST_Articles_streamDetails_spec.js
   ARTSA-4985
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
var LIMIT = 5
var xURL = configuration.xURL;
var restArticles = configuration.restArticles;
var topic = credentials.LongRunTopicID;

	frisby.create('POST Stream Details')
		.post(xURL + restArticles + 'query/details',
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
		.after(function() {console.log('=====>>>>>End Of POST Stream Details<<<<<=====')})
		.toss();