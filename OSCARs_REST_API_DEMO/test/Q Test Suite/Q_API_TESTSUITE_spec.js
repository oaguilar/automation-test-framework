/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QQA = configuration.QQA;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;
var restTopic = configuration.restTopic;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'


//Generates UToken for User//
	frisby.create('UToken - User')
		.post(QQA + restUser + '/auth',
		{ username : autoUsername, password: autoPassword, accountName: autoAccountName},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }}
		)
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
				.expectJSON({
				enabled: true,
				loginFailed: false
		})
		.expectJSONTypes({
				authkey: String,
				account: Number
		})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>UToken - User Completed<<<<<=====')})
        .afterJSON(function (res) {

//Callback UToken for all other REST API Service Calls//
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)  
    });

//Creates a Topic//	
	frisby.create('Topic Create')
		.post(QQA + restTopic,
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
				},
				{
					type: 'content_subtype',
					values: [
					'Twitter'
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

		
//Q TESTSUITE//

	//Article Query//
	require('./Q_API_TEST_EntitySentiment_spec.js');
/* 	require('./Q_API_TEST_FiltersGenderExample_spec.js');
	require('./Q_API_TEST_TopicMetrics_spec.js');
	require('./Q_API_TEST_TimeSeries_spec.js');
	require('./Q_API_TEST_TSRelevantArticles_spec.js');
	require('./Q_API_TEST_Aggregate_spec.js');
	require('./Q_API_TEST_Volatility_spec.js');
	require('./Q_API_TEST_Trends_spec.js');
	require('./Q_API_TEST_Details_spec.js');
	require('./Q_API_TEST_Clusters_spec.js'); */
	//require('./Q_API_TEST_FieldsMap_spec.js');
	//require('./Q_API_TEST_TopicDelete_spec.js');
	//require('./Q_API_TEST_StreamDetails_spec.js');
	
	//Article Query AGG//
	/* require('./Q_API_TEST_AggregateOverviewSources_spec.js');
	require('./Q_API_TEST_AggregateSentimentRatio_spec.js');
	require('./Q_API_TEST_AggregateOverviewLocationMentions_spec.js');
	require('./Q_API_TEST_AggregateReach_spec.js');
	require('./Q_API_TEST_AggregateImpressions_spec.js');
	require('./Q_API_TEST_AggregateFollowers_spec.js');
	require('./Q_API_TEST_AggregateDemographicsLocationTopLevel_spec.js');
	require('./Q_API_TEST_AggregateDemographicsLocationDrillDown_spec.js');
	require('./Q_API_TEST_AggregateDemographicsGender_spec.js');
	require('./Q_API_TEST_AggregateCompanySentimentSentiment_spec.js');
	require('./Q_API_TEST_AggregateDemographicsLocationMentions_spec.js'); */
	
	//Topic//
/* 	require('./Q_API_TEST_TopicList_spec.js');
	require('./Q_API_TEST_TopicNameUnique_spec.js');
	require('./Q_API_TEST_TopicNameNOTUnique_spec.js'); //https://jira.attensity.com/browse/ART-3409
	require('./Q_API_TEST_TopicSanityChecker_spec.js');
	require('./Q_API_TEST_TopicEdit_spec.js');*/
	require('./Q_API_TEST_TopicAuditTrail_spec.js'); 
	require('./Q_API_TEST_TopicDelete_spec.js');
	
	//User Login Authorization//
/* 	require('./Q_API_TEST_UserUniqueFALSE_spec.js');
	require('./Q_API_TEST_UserUniqueTRUE_spec.js');
	require('./Q_API_TEST_UsernameInvalid_spec.js');
	require('./Q_API_TEST_PasswordInvalid_spec.js');
	require('./Q_API_TEST_AccountInvalid_spec.js');
	require('./Q_API_TEST_AccountUserValidLogin_spec.js'); */
	
	}).toss();
}).toss();
