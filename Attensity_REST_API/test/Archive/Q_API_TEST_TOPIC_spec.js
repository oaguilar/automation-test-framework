/* jasmine-node Q_API_TEST_TOPIC_spec.js */

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

var IP01 = configuration.IP01;
var QHTTP = configuration.QHTTP;
var BOHTTP = configuration.BOHTTP;
var URL = configuration.URL_RESTTPC;
var AUTH = configuration.URL_RESTUSR;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10

{
  console.log(sm.unix())
  console.log(em.unix())
}

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('UToken - User')
		.post(QHTTP + AUTH + '/auth',
		{ username : configuration.username, password: configuration.password, accountName: configuration.accountName},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
	    .after(function() {console.log('=====>>>>>UToken - User Completed<<<<<=====')})
        .afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
    });
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Topic List')
		.get(QHTTP + URL)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic List<<<<<=====')})
		.toss();
	
    frisby.create('Topic Name Unique')
		.post(QHTTP + URL + '/unique',
		{
			name:'1 american idol'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Name Unique<<<<<=====')})
		.toss();	
		
    frisby.create('Topic Sanity Checker')
		.post(QHTTP + URL + '/sanity',
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
		.expectJSONLength(2)
		.after(function() {console.log('=====>>>>>End Of Topic Sanity Checker<<<<<=====')})
		.toss();
		
	frisby.create('Topic Create')
		.post(QHTTP + URL,
			{
				id: TOPIC_ID,
				name: TOPIC_NM,
				jsonDefinition: {
					includeAll: [{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'super',
						id: 'KEYWORD-KEYWORD-super',
						alias: 'KEYWORD'
					}],
					includeAny: [{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'day',
						id: 'KEYWORD-KEYWORD-day',
						alias: 'KEYWORD'
					}],
					additionalIncludeAny: [[{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'beach',
						id: 'KEYWORD-KEYWORD-beach',
						alias: 'KEYWORD'
					}]],
					exclude: [{
						extraction: 'KEYWORD',
						type: 'KEYWORD',
						text: 'dirt',
						id: 'KEYWORD-KEYWORD-dirt',
						alias: 'KEYWORD'
					}],
					exactPhrases: [],
					other: [{
						type: 'lang',
						values: ['en']
					},
							{
						type: 'content_type',
						values: ['blogpost',
						'forumpost',
						'mainstreamnews']
					},
					{
						type: 'content_subtype',
						values: ['googleplus',
						'youtube',
						'facebookpost',
						'facebookcomment']
					},
					{
						type: 'spam_type_category',
						values: ['drug_related',
						'for_sale',
						'giveaways',
						'updates',
						'game_postings',
						'pornography']
					}],
			results:{}
				}
			})
		.expectStatus(200)
		.inspectJSON()
		.expectJSON({'createdBy': 'restapi'})
		.expectJSONTypes({'createdBy': String})
		.after(function() {console.log('=====>>>>>End Of Topic create through API NODE.JS<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		
	frisby.create('Topic Edit')
		.post(QHTTP + URL,
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
		
	frisby.create('Topic Alerts')
		.post(QHTTP + URL + '/update/alerts',		
		{
			id: id,
			topicAlerts:
			[
				{
					value: 1,
					timeInterval: 'DAILY',
					alertActive: true,
					alertType: 'VOLUME_ALERT'
				}
			]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Alerts<<<<<=====')})
		.toss();
		
	frisby.create('Topic Audit Trail')
		.get(QHTTP + URL + '/topicAudit/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.expectJSON('?', {'createdBy': 'restapi'})
		.expectJSONTypes('?', {'createdBy': String})
		.expectJSONLength(2)
		.after(function() {console.log('=====>>>>>End Of Topic Audit Trail<<<<<=====')})
		.toss();
			
	frisby.create('Topic Delete')
		.delete(QHTTP + URL + '/'+ id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Delete<<<<<=====')})
		.toss();
	}).toss();
}).toss();