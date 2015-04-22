/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var sd = moment();
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);

var QHTTP = configuration.QHTTP;
var URL = configuration.URL_RESTQRY;
var URX = configuration.URL_RESTTPC;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10

{
  console.log(sm.unix())
  console.log(em.unix())
}

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(configuration.AUTH_URL,
		{ username : configuration.username, password: configuration.password, accountName: configuration.accountName},
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

//Creates a Topic//	
	frisby.create('Topic Create')
		.post(QHTTP + URX,
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
		.expectJSON({lookbackComplete: 101})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>Topic create through API NODE.JS<<<<<=====')})
//Callback Topic ID for REST API Service Calls//
		.afterJSON(function(json) {
		 var id = json.id

		 
    frisby.create('entitysentiment')
		.post(QHTTP + URL + '/entitysentiment',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of entitysentiment<<<<<=====')})
		.toss();
		
	frisby.create('Filters - Gender Example')
		.post(QHTTP + URL + '/entitysentiment',
		{ topicIDs:[id], 
		 limit:LIMIT,
		 filters:[
			  {field:'article_gender', comparison:'CO_OCCURS', values:['f']} 
				   ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Filters - Gender Example<<<<<=====')})
		.toss();
	
    frisby.create('topicmetrics')
		.get(QHTTP + URL + '/topicmetrics')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of topicmetrics<<<<<=====')})
		.toss();
	  
    frisby.create('timeseries')
		.post(QHTTP + URL + '/timeseries',
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
		.post(QHTTP + URL + '/tsrelevantarticles',
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
		.post(QHTTP + URL + '/aggregate',
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
		.post(QHTTP + URL + '/volatility',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of volatility<<<<<=====')})
		.toss();
	  
    frisby.create('trends')
		.post(QHTTP + URL + '/trends',
		{ topicIDs:[id], dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of trends<<<<<=====')})
		.toss();
		
	frisby.create('details')
		.post(QHTTP + URL + '/details',
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
		.post(QHTTP + URL + '/clusters',
		{ topicIDs:[id], 
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of clusters<<<<<=====')})
		.toss();
		
    frisby.create('fieldsmap')
		.post(QHTTP + URL + '/fieldsmap')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of fieldsmap<<<<<=====')})
		.toss();
		
	frisby.create('Topic Delete')
		.delete(QHTTP + URX + '/'+ id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Delete<<<<<=====')})
		.toss();
	}).toss();
}).toss();