/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */

var frisby = require('frisby')
var URL = 'http://10.202.207.206:8080/ArticleQueryApi/rest/query';
var URX = 'http://10.202.207.206:8080/SaasCoreTopicManager/rest/topic';
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'
var START_DT = 1425248813000
var END_DT = 1460149317000
var LIMIT = 10


	frisby.create('UToken - User')
		.post('http://10.202.207.206:8080/SaasCoreUserManager/rest/auth',
		{ username : 'oaguilar', password: 'P@ssword1', accountName: 'qabeta'},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
	    .after(function() {console.log('UToken - User')})
        .afterJSON(function (res) {
    /* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
    });
	
	frisby.create('Topic Create')
		.post(URX,
		{
			id: TOPIC_ID,
				name: TOPIC_NM,
				jsonDefinition: {
				includeAll: [
				{
					extraction: 'ENTITY',
					type: 'COMPANY',
					text: 'Apple',
					alias: 'Company'
				}
					],
				includeAny: [],
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
		.after(function() {console.log('=====>>>>>Topic create through API NODE.JS<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		
    frisby.create('entitysentiment')
		.post(URL + '/entitysentiment',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of entitysentiment<<<<<=====')})
		.toss();
	
    frisby.create('topicmetrics')
		.get(URL + '/topicmetrics')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of topicmetrics<<<<<=====')})
		.toss();
	  
    frisby.create('timeseries')
		.post(URL + '/timeseries',
		{ topicIDs:[id], 
		 limit:LIMIT,
		 selectedFields:[
        {field:'content_volume()'},
        {field:'topic_id'},
        {field:'ts_average()'}
		],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		timeSlice:'DAY'})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of timeseries<<<<<=====')})
		.toss();
		
    frisby.create('tsrelevantarticles')
		.post(URL + '/tsrelevantarticles',
		{ topicIDs:[id], 
		 limit:LIMIT,
         selectedFields:[
        { field:'content_volume()', sortDirection: 'DESCENDING'},
        { field:'article_sentiment', sortDirection:'ASCENDING'}
		],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		timeSlice:'DAY'})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of tsrelevantarticles<<<<<=====')})
		.toss();
		
	frisby.create('aggregate')
		.post(URL + '/aggregate',
		{ topicIDs:[id], 
		 limit:LIMIT,
         selectedFields:[
        { field:'content_volume()', sortDirection: 'DESCENDING'},
        { field:'article_sentiment', sortDirection:'ASCENDING'}
		],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of aggregate<<<<<=====')})
		.toss();
		
	frisby.create('volatility')
		.post(URL + '/volatility',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of volatility<<<<<=====')})
		.toss();
	  
    frisby.create('trends')
		.post(URL + '/trends',
		{ topicIDs:[id], dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of trends<<<<<=====')})
		.toss();
		
	frisby.create('details')
		.post(URL + '/details',
		{ topicIDs:[id], 
		 limit:LIMIT,
         selectedFields:[
        { field:'article_published_at', sortDirection: 'DESCENDING'},
        { field:'article_publisher'},
		{ field:'article_screen_name'},
		{ field:'article_title'},
		{ field:'article_topic'},
		{ field:'article_uri'},
		{ field:'article_content_subtype'},
		{ field:'article_content_type'},
		{ field:'author_name'},
		{ field:'author_image_url'},
		{ field:'body'},
		{ field:'article_followers'},
		{ field:'article_klout'},
		{ field:'article_sentiment'},
		],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		timeSlice:'HOUR'})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of details<<<<<=====')})
		.toss();

    frisby.create('clusters')
		.post(URL + '/clusters',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of clusters<<<<<=====')})
		.toss();
		
    frisby.create('fieldsmap')
		.post(URL + '/fieldsmap')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of fieldsmap<<<<<=====')})
		.toss();
		
	frisby.create('Topic Delete')
		.delete(URX + '/'+ id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Delete<<<<<=====')})
		.toss();
	}).toss();
}).toss();