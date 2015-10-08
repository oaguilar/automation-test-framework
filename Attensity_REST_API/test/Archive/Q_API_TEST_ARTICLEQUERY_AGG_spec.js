/* jasmine-node Q_API_TEST_ARTICLEQUERY_AGG_spec.js */
/* Updated on April 20, 2015 */
//Tests all Aggregate calls for all Aggregate widgets using long running topic

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var endDate = moment();
var em = moment.unix(endDate);
var startDate = moment().subtract(7, 'days');
var sm = moment.unix(startDate);
var URL = configuration.QQA;
var AuthURL = configuration.URL_QQAAuth;
var IP01 = configuration.IP01;
var HTTPS = configuration.HTTPS;
var aggQuery = configuration.restAggregate;
var AUTH = configuration.URL_restUser;
var topic = configuration.autoLongRunTopicID;
var START_DT = sm.unix()
var END_DT = em.unix()

{
  console.log(sm.unix())
  console.log(em.unix())
}

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(AuthURL,
		{ username : configuration.autoUsername, password: configuration.autoPassword, accountName: configuration.autoAccountName},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
	    .after(function() {console.log('=====>>>>>UToken - User Completed<<<<<=====')})
        .afterJSON(function (res) {

//Callback UToken for all other REST API Service Calls//
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
    });

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    frisby.create('Aggregate - Overview Sources')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 10,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields:[
		{'field':'article_content_subtype'},
		{'field': 'article_content_type'},
		{'field':'content_volume()', 'sortDirection':'DESCENDING'}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate Overview Sources<<<<<=====')})
		.toss();
		
	frisby.create('Aggregate - Sentiment Ratio')
		.post(QQA + aggQuery,
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
						
	frisby.create('Aggregate - Overview Location of Mentions')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 0,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields:[
		{'field':'author_country','sortDirection': 'ASCENDING'},
		{'field':'content_volume()', 'sortDirection':'DESCENDING'}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Overview Location of Mentions<<<<<=====')})
		.toss();
	
	frisby.create('Aggregate - Reach')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 1,
		filters:[{"field":"article_content_type","comparison":"EQ","values":["blogpost","forumpost"]}],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{'field':'article_reach_sum','sortDirection':'DESCENDING'}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Reach<<<<<=====')})
		.toss();
		
	frisby.create('Aggregate - Impressions')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 1,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"article_impressions","sortDirection":"DESCENDING"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Impressions<<<<<=====')})
		.toss();
		
	frisby.create('Aggregate - Followers')
		.post(QQA + aggQuery,
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

	frisby.create('Aggregate - Demographics - Location - TopLevel')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 0,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"article_gender"},{"field":"content_volume()"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Demographics - Location - TopLevel<<<<<=====')})
		.toss();

	frisby.create('Aggregate - Demographics - Location - DrillDown')
		.post(QQA + aggQuery,
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
		.after(function() {console.log('=====>>>>>End Of Aggregate - Demographics - Location - DrillDown<<<<<=====')})
		.toss();
	
	frisby.create('Aggregate - Demographics - Gender')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 0,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"article_gender"},{"field":"content_volume()"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Demographics - Gender<<<<<=====')})
		.toss();
		
		frisby.create('Aggregate - Company Sentiment - Sentiment')
		.post(QQA + aggQuery,
		{ topicIDs: [topic], 
		limit: 0,
		filters:[],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields: [{"field":"themes_category()"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Aggregate - Company Sentiment - Sentiment<<<<<=====')})
		.toss();		
}).toss();