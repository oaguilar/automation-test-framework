/* jasmine-node BO_API_TEST_AverageAndMonthlyVolume_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var fs, configurationFile;
	configurationFile = 'Q_credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	
	
var xURL = configuration.xURL;
var restUser = configuration.restUser;
var autoUsername = credentials.autoUsername;
var autoPassword = credentials.autoPassword;
var autoAccountName = credentials.autoAccountName;
var restTopic = configuration.restTopic;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(xURL + restUser + '/auth',
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
		.post(xURL + restTopic,
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
/* 	require('./Alerts/Q_API_TEST_AccountAlerts_spec.js');
	require('./Alerts/Q_API_TEST_TopicAlerts_spec.js');
	require('./Alerts/Q_API_TEST_UserAlerts_spec.js');
	require('./Alerts/Q_API_TEST_AllAlerts_spec.js');
	require('./Alerts/Q_API_TEST_AlertTypes_spec.js');
	require('./Alerts/Q_API_TEST_DismissAlert_spec.js');
	require('./Alerts/Q_API_TEST_HideAlert_spec.js'); */
	
	//Dashboards//
/* 	require('./Dashboards/Q_API_TEST_Dashboards_spec.js');
	require('./Dashboards/Q_API_TEST_DashboardsIncludeWidgets_spec.js');
	require('./Dashboards/Q_API_TEST_DashboardId_spec.js');  */
	//require('./Dashboards/Q_API_TEST_Dashboard_spec.js'); //Sub-Test Scripts: Q_API_TEST_DashboardDelete_spec.js//
/* 	require('./Dashboards/Templates/Q_API_TEST_GET_DashboardTemplates_spec.js');
	require('./Dashboards/Templates/Q_API_TEST_POST_DashboardTemplates_spec.js'); */
/* 	require('./Dashboards/Q_API_TEST_TopicDashboards_spec.js');
	require('./Dashboards/Q_API_TEST_POST_TopicDashboard_spec.js'); */

	//Article Query//
	//require('./Q_API_TEST_EntitySentiment_spec.js');
	//require('./Article_Query/Q_API_TEST_StreamDetails_spec.js');
/* 	require('./Article_Query/Q_API_TEST_FiltersGenderExample_spec.js');
	require('./Article_Query/Q_API_TEST_TopicMetrics_spec.js');
	require('./Article_Query/Q_API_TEST_TimeSeries_spec.js');
	require('./Article_Query/Q_API_TEST_TSRelevantArticles_spec.js');
	require('./Article_Query/Q_API_TEST_Aggregate_spec.js');
	require('./Article_Query/Q_API_TEST_Volatility_spec.js');
	require('./Article_Query/Q_API_TEST_Trends_spec.js');
	require('./Article_Query/Q_API_TEST_Details_spec.js');
	require('./Article_Query/Q_API_TEST_Clusters_spec.js');
	require('./Article_Query/Q_API_TEST_FieldsMap_spec.js'); */
	//require('./Q_API_TEST_TopicDelete_spec.js');

	
	//Article Query AGG//
	require('./Article_Query/Q_API_TEST_AggregateOverviewSources_spec.js');
/* 	require('./Article_Query/Q_API_TEST_AggregateSentimentRatio_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateOverviewLocationMentions_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateReach_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateImpressions_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateFollowers_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateDemographicsLocationTopLevel_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateDemographicsLocationDrillDown_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateDemographicsGender_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateCompanySentimentSentiment_spec.js');
	require('./Article_Query/Q_API_TEST_AggregateDemographicsLocationMentions_spec.js');
	 */
	//Topic_Manager//
/*  require('./Topic_Manager/Q_API_TEST_TopicList_spec.js');
	require('./Topic_Manager/Q_API_TEST_TopicReport_spec.js');
	require('./Topic_Manager/Q_API_TEST_UpdateTopicAlert_spec.js');
	require('./Topic_Manager/Q_API_TEST_GET_TopicID_spec.js');
	require('./Topic_Manager/Q_API_TEST_PUT_TopicID_spec.js'); */
	//require('./Topic_Manager/Q_API_TEST_TopicNameUnique_spec.js');
	//require('./Topic_Manager/Q_API_TEST_TopicNameNOTUnique_spec.js');
/* 	require('./Topic_Manager/Q_API_TEST_TopicSanityChecker_spec.js');
	require('./Topic_Manager/Q_API_TEST_TopicEdit_spec.js');
	require('./Topic_Manager/Q_API_TEST_TopicAuditTrail_spec.js'); 
	require('./Topic_Manager/Q_API_TEST_Get_TOPICDataSource_spec.js');
	require('./Topic_Manager/Q_API_TEST_DataSourceUI_spec.js');
	require('./Topic_Manager/Q_API_TEST_CreateDatasource_spec.js'); */ //Sub-Test Scripts: GET Dashboard ID; DELETE Dashboard ID//
	
	//require('./Topic_Manager/Q_API_TEST_Get_TOPICDataSourceID_spec.js');
	require('./Topic_Manager/Q_API_TEST_TopicDelete_spec.js');
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
	
	