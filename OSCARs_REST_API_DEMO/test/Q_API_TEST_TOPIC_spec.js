/* jasmine-node Q_API_TEST_TOPIC_spec.js */

var frisby = require('frisby')
var URL = 'http://10.202.207.206:8080/SaasCoreTopicManager/rest/topic';
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'
var START_DT = 1425248813000
var END_DT = 1460149317000
var LIMIT = 10


	frisby.create('UToken - User')
		.post('http://10.202.207.206:8080/SaasCoreUserManager/rest/auth',
		{ username : '[YOUR USERID]', password: '[YOUR PASSWORD]', accountName: '[YOUR ACCOUNT NAME]'},
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
		
	frisby.create('Topic List')
		.get(URL)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic List<<<<<=====')})
		.toss();
	
    frisby.create('Topic Name Unique')
		.post(URL + '/unique',
		{
			name:'1 american idol'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Name Unique<<<<<=====')})
		.toss();	
		
    frisby.create('Topic Sanity Checker')
		.post(URL + '/sanity',
		{ 		
			jsonDefinition: {
					includeAll: [],
					includeAny: [
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'i',
							alias: 'KEYWORD'
						},
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'me',
							alias: 'KEYWORD'
						},
						{
							extraction: 'KEYWORD',
							type: 'KEYWORD',
							text: 'me',
							alias: 'KEYWORD'
						}
					],
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
		.after(function() {console.log('=====>>>>>End Of Topic Sanity Checker<<<<<=====')})
		.toss();
		
	frisby.create('Topic Create')
		.post(URL,
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
		.after(function() {console.log('=====>>>>>End Of Topic create through API NODE.JS<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		
	frisby.create('Topic Edit')
		.post(URL,
		{
			id: id,
			name: TOPIC_NM,
			jsonDefinition: {
				includeAll: [],
				includeAny: [
					{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'super',
						alias: 'KEYWORD'
					},
					{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'day',
						alias: 'KEYWORD'
					}
				],
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
		.after(function() {console.log('=====>>>>>End Of Topic Edit<<<<<=====')})
		.toss();
		
	frisby.create('Topic Audit Trail')
		.get(URL + '/topicAudit/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Audit Trail<<<<<=====')})
		.toss();
			
	frisby.create('Topic Delete')
		.delete(URL + '/'+ id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Delete<<<<<=====')})
		.toss();
	}).toss();
}).toss();