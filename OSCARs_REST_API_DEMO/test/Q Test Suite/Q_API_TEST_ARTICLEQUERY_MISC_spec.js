/* jasmine-node Q_API_TEST_ARTICLEQUERY_MISC_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby');
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


	frisby.create('Overview - Bubble Chart (entitysentiment)')
		.post(QHTTP + URL + '/entitysentiment',
		{ topicIDs:[id], 
		 limit:LIMIT,
		 filters:[
				   ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Overview - Bubble Chart (entitysentiment)<<<<<=====')})
		.toss();
		
	frisby.create('Overview - Volatility (volatility)')
		.post(QHTTP + URL + '/volatility',
		{ topicIDs:[id], 
		 filters:[
				   ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Overview - Volatility (volatility)<<<<<=====')})
		.toss();
		
	frisby.create('Topic Delete')
		.delete(QHTTP + URX + '/'+ id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Delete<<<<<=====')})
		.toss();		
		
		
		
			 
}).toss();
}).toss();