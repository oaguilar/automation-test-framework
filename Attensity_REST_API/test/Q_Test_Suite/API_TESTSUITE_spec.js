/* jasmine-node API_TESTSUITE_spec.js */
/* Updated on October 27, 2015 */

var frisby = require('frisby')

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
	
var xURL = configuration.xURL;
var restUser = configuration.restUser;
var Username = credentials.Username;
var Password = credentials.Password;
var AccountName = credentials.AccountName;
var restTopic = configuration.restTopic;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(xURL + restUser + 'auth',
		{ username : Username, password: Password, accountName: AccountName},
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
		.post(xURL + restTopic + 'topic',
		{
			id: TOPIC_ID,
				name: TOPIC_NM,
				jsonDefinition: {
				includeAll: [
				{
					extraction: 'ENTITY',
					type: 'COMPANY',
					text: 'Yahoo',
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

	//Alerts//
/*  require('./Alerts/GET_Alerts_accountAlerts_spec.js');
	require('./Alerts/GET_Alerts_allAlerts_spec.js');
	require('./Alerts/GET_Alerts_alertTypes_spec.js');
	require('./Alerts/PUT_Alerts_dismissAlert_spec.js');
	require('./Alerts/PUT_ALerts_hideAlert_spec.js');
	require('./Alerts/GET_Topic_topicAlerts_spec.js');
	require('./Alerts/GET_Alerts_accountUser_spec.js'); */

	//Article Query//
	//require('./Q_API_TEST_EntitySentiment_spec.js');
/* 	require('./Article_Query/POST_Articles_streamDetails_spec.js');
 	require('./Article_Query/POST_Articles_filtersGenderExample_spec.js');
	require('./Article_Query/GET_Articles_topicMetrics_spec.js');
	require('./Article_Query/POST_Articles_timeSeries_spec.js');
	require('./Article_Query/POST_Articles_tsRelevantArticles_spec.js');
	require('./Article_Query/POST_Articles_aggregate_spec.js');
	require('./Article_Query/POST_Articles_volatility_spec.js');
	require('./Article_Query/POST_Articles_trends_spec.js');
	require('./Article_Query/POST_Articles_details_spec.js' );
	require('./Article_Query/POST_Articles_clusters_spec.js');
	require('./Article_Query/GET_Articles_fieldsMap_spec.js'); 
	require('./Article_Query/POST_Articles_aggregateOverviewSources_spec.js');
    require('./Article_Query/POST_Articles_aggregateSentimentRatio_spec.js');
	require('./Article_Query/POST_Articles_aggregateOverviewLocationMentions_spec.js');
	require('./Article_Query/POST_Articles_aggregateReach_spec.js');
	require('./Article_Query/POST_Articles_aggregateImpressions_spec.js');
	require('./Article_Query/POST_Articles_aggregateFollowers_spec.js');
	require('./Article_Query/POST_Articles_aggregateDemographicsLocationTopLevel_spec.js');
	require('./Article_Query/POST_Articles_aggregateDemographicsLocationDrillDown_spec.js');
	require('./Article_Query/POST_Articles_aggregateDemographicsGender_spec.js');
	require('./Article_Query/POST_Articles_aggregateCompanySentimentSentiment_spec.js');
	require('./Article_Query/POST_Articles_aggregateDemographicsLocationMentions_spec.js');
	require('./Article_Query/POST_Articles_overviewBubbleChart_spec.js'); */
	
	//Dashboards//
/* 	require('./Dashboards/Q_API_TEST_Dashboards_spec.js');
	require('./Dashboards/Q_API_TEST_DashboardsIncludeWidgets_spec.js');
	require('./Dashboards/Q_API_TEST_DashboardId_spec.js');  */
	//require('./Dashboards/Q_API_TEST_Dashboard_spec.js'); //Sub-Test Scripts: Q_API_TEST_DashboardDelete_spec.js//
/* 	require('./Dashboards/Templates/Q_API_TEST_GET_DashboardTemplates_spec.js');
	require('./Dashboards/Templates/Q_API_TEST_POST_DashboardTemplates_spec.js'); */
/* 	require('./Dashboards/Q_API_TEST_TopicDashboards_spec.js');
	require('./Dashboards/Q_API_TEST_POST_TopicDashboard_spec.js'); */

 
	//Internal//
	//require('./Internal/Q_API_TEST_InternalTopicStatus_spec.js');
	
	 
	 
	//Topic_Manager//
    require('./Topic_Manager/GET_Topic_articleQuery_spec.js');
	require('./Topic_Manager/GET_Topic_topicReport_spec.js');
	require('./Topic_Manager/POST_Topic_updateTopicAlert_spec.js');
	require('./Topic_Manager/GET_Topic_topicId_spec.js');
	require('./Topic_Manager/PUT_Topic_topicId_spec.js');
	require('./Topic_Manager/POST_Topic_topicNameUnique_spec.js');
	require('./Topic_Manager/POST_Topic_topicNameNOTUnique_spec.js');
 	require('./Topic_Manager/POST_Topic_topicSanityChecker_spec.js');
	require('./Topic_Manager/POST_Topic_topicEdit_spec.js');
	require('./Topic_Manager/GET_Topic_topicAuditTrail_spec.js'); 
	require('./Topic_Manager/GET_Topic_topicDataSource_spec.js');
	require('./Topic_Manager/GET_Topic_dataSourceUI_spec.js');
	require('./Topic_Manager/POST_Topic_createDatasource_spec.js');  //Sub-Test Scripts: GET_Topic_topicDataSourceId_spec.js; DELETE_Topic_dataSource_spec.js//
	
	//require('./Topic_Manager/Q_API_TEST_Get_TOPICDataSourceID_spec.js');
	require('./Topic_Manager/DELETE_topicId_spec.js');
	//require('./User_Manager/Q_API_TEST_POST_LoginReminderAccount_spec.js');
	
	//User_Manager//
	//require('./User_Manager/Q_API_TEST_POST_UserProfile_spec.js');
	//require('./User_Manager/Q_API_TEST_PUT_UserProfileID_spec.js');
	//require('./User_Manager/Q_API_TEST_POST_UserProfilePassword_spec.js');
	//require('./User_Manager/Q_API_TEST_POST_UserProfilePasswordx_spec.js'); //reverse is back to previous password//
	//require('./User_Manager/Q_API_TEST_GET_User_spec.js');
	//require('./User_Manager/Q_API_TEST_GET_UserID_spec.js');
/* 	require('./User_Manager/Q_API_TEST_UserUniqueFALSE_spec.js');
	require('./User_Manager/Q_API_TEST_UserUniqueTRUE_spec.js');
	require('./User_Manager/Q_API_TEST_UsernameInvalid_spec.js');*/
	//require('./User_Manager/Q_API_TEST_UserAuth_spec.js'); //Sub-Test Scripts: Q_API_TEST_GET_UserAuthID_spec.js//
	//require('./User_Manager/Q_API_TEST_GET_UserAuthID_spec.js');
	//require('./User_Manager/Q_API_TEST_GET_UserAuth_spec.js');
	//require('./User_Manager/Q_API_TEST_DELETE_UserAuthID_spec.js');
	

	
	}).toss();
	//require('./User_Manager/Q_API_TEST_POST_LoginReminderAccount_spec.js');
}).toss();
	
	