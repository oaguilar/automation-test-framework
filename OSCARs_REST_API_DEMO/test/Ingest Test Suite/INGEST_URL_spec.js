/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'INGST_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var INGEST_URL = configuration.INGEST_URL;
var restUser = configuration.restUser;
var autoUsername = configuration.autoUsername;
var autoPassword = configuration.autoPassword;
var autoAccountName = configuration.autoAccountName;
var restTopic = configuration.restTopic;
var TOPIC_ID = -1
var TOPIC_NM = 'Topic Create through API NODE.JS'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Generates UToken for User//
	frisby.create('UToken - User')
		.post(INGEST_URL + restUser + '/auth',
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

	frisby.create('Create New Datasource')
//Retrieves All Data Source IDs

frisby.create('Get All Data Source IDs')
	.post(INGEST_URL + restTopic + '/datasources/',
{id:-1,
 name:'AutomationTest', 
 description: 'AutomationTestPOSTMAN',
 type: 'comment',
 account : 10012,  
 fields : [
             {name : 'name',  display_name: 'name', title: 'name', type : 'string', length: 100, usage : ['pass-through']}, 
             {name : 'author', display_name: 'author', title: 'author', type : 'string', length: 100, usage : ['person-name']}, 
             {name : 'answer', display_name: 'survey answer', title: 'survey question', type : 'string', usage : ['annotate', 'survey_answer']}, 
             {name : 'sex', display_name: 'gender', title: 'gender', type : 'string', usage : ['gender']}, 
             {name : 'dateCreated', display_name: 'creation date', title: 'creation date', type : 'string', usage : ['creation_date']}, 
             {name : 'dateRetrieved', display_name: 'retrieval date', title: 'retrieval date', type : 'string', usage : ['retrieval_date']}, 
             {name : 'location', display_name: 'location', title: 'location', type : 'string', usage : ['geographic_ID']}, 
			 {name : 'age', display_name: 'age', title: 'age', type : 'int', usage : ['age']}
		]})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Create New Datasource<<<<<=====')})
		//Callback Topic ID for REST API Service Calls//
		.afterJSON(function(json) {
		 var id = json.id
		
//INGEST TESTSUITE//

	//Ingest Data Sources//
	require('./INGEST_GetDataSourceID_spec.js');
	require('./INGEST_GetAllDataSourceID_spec.js');
	//require('./INGEST_CreateNewDatasource_spec.js');
	require('./INGEST_DeleteDatasource_spec.js');
	}).toss();
}).toss();