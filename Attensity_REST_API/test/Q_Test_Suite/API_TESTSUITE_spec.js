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
/*  	require('./Alerts/GET_Alerts_accountAlerts_spec.js');
	require('./Alerts/GET_Alerts_allAlerts_spec.js');
	require('./Alerts/GET_Alerts_alertTypes_spec.js');
	require('./Alerts/PUT_Alerts_dismissAlert_spec.js');
	require('./Alerts/PUT_ALerts_hideAlert_spec.js');
	require('./Alerts/GET_Topic_topicAlerts_spec.js');
	require('./Alerts/GET_Alerts_accountUser_spec.js'); */
	
	//Dashboards//
/*  	require('./Dashboards/GET_Dashboard_dashboards_spec.js');
	require('./Dashboards/GET_Dashboard_dashboardsIncludeWidgets_spec.js');
	require('./Dashboards/POST_Dashboard_createDashboard_spec'); //Sub-Test Scripts: GET_Dashboard_dashboardId_spec.js; DELETE_dashboard_spec.js//
	require('./Dashboards/GET_Dashboard_dashboardTemplates_spec.js');
 	require('./Dashboards/POST_Dashboard_dashboardTemplates_spec.js'); //Sub-Test Scripts: DELETE_Dashboard_dashboardTemplate_spec.js//
 	require('./Dashboards/GET_Dashboard_topicDashboardId_spec.js');
	require('./Dashboards/POST_Dashboard_dashboardId_spec.js');
	require('./Dashboards/DELETE_Dashboard_dashboardId_spec.js'); */
	

	//Article Query//
	//require('./Article_Query/GET_Articles_getAllFields_spec.js');
	//require('./Article_Query/GET_Articles_loadSourceFields_spec.js');
	//require('./Article_Query/POST_Articles_hideArticle_spec.js');
	//require('./Article_Query/POST_Articles_getHiddenArticles_spec.js');
	//require('./Article_Query/POST_Articles_detailsById_spec.js');
	//require('./Article_Query/POST_Articles_trendsAndStdDev_spec.js');
/* 	require('./Article_Query/POST_Articles_entitySentiment_spec.js');
	require('./Article_Query/POST_Articles_topInfluencersDetails_spec.js');
 	require('./Article_Query/POST_Articles_streamDetails_spec.js');
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
	require('./Article_Query/POST_Articles_overviewBubbleChart_spec.js');  */
	


	
	//Kermit//
	//require('./Kermit/GET_Kermit_stoplist_spec.js');
/* 	require('./Kermit/GET_Kermit_suggestions_spec.js');
	require('./Kermit/GET_Kermit_entityEditor_spec.js');
	require('./Kermit/GET_Kermit_directory_spec.js');
	require('./Kermit/GET_Kermit_eltemplates_spec.js');
	require('./Kermit/GET_Kermit_projects_spec.js');
	require('./Kermit/GET_Kermit_entitylists_spec.js'); */
	
	
	 
	//Topic_Manager//
	require('./Topic_Manager/GET_Topic_topicAlertId_spec.js');
/*	require('./Topic_Manager/GET_Topic_articleQuery_spec.js');
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
	require('./Topic_Manager/POST_Topic_createDatasource_spec.js');  //Sub-Test Scripts: GET_Topic_topicDataSourceId_spec.js; DELETE_Topic_dataSource_spec.js// */
	//require('./Topic_Manager/GET_Topic_topicCustomDSId_spec.js');
	require('./Topic_Manager/DELETE_topicId_spec.js'); 
	//require('./User_Manager/Q_API_TEST_POST_LoginReminderAccount_spec.js');
	
	//User_Manager//
    //require('./User_Manager/POST_User_userProfile_spec.js');
/* 	require('./User_Manager/POST_User_userProfile_spec.js');
	require('./User_Manager/PUT_User_userProfileID_spec.js');
	require('./User_Manager/POST_User_userProfilePassword_spec.js');
	require('./User_Manager/POST_User_userProfilePasswordx_spec.js'); //reverses the password back to its previous password//
	require('./User_Manager/GET_User_user_spec.js');
	require('./User_Manager/GET_User_userId_spec.js');
 	require('./User_Manager/POST_User_userUniqueFALSE_spec.js');
	require('./User_Manager/POST_User_userUniqueTRUE_spec.js');
	require('./User_Manager/POST_User_usernameInvalid_spec.js');
	require('./User_Manager/POST_User_userAuth_spec.js');
	require('./User_Manager/GET_User_userAuthId_spec.js');
	require('./User_Manager/GET_User_userAuth_spec.js');
	//require('./User_Manager/DELETE_User_userAuthId_spec.js');
	require('./User_Manager/POST_User_invalidUserAuth_spec.js');
	require('./User_Manager/POST_User_invalidUserPassword_spec.js');
	require('./User_Manager/POST_User_invalidUserPassword_spec.js'); */
	//require('./User_Manager/Q_API_TEST_POST_LoginReminderAccount_spec.js');
	
	}).toss();
	//require('./User_Manager/Q_API_TEST_POST_LoginReminderAccount_spec.js');
}).toss();
	
	