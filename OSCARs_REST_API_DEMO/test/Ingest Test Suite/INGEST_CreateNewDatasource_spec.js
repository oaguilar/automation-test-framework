/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'INGST_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var INGEST_URL = configuration.INGEST_URL;
var restTopic = configuration.restTopic;

frisby.create('Create New Datasource')
//Retrieves All Data Source IDs

frisby.create('Get All Data Source IDs')
	.post(INGEST_URL + restTopic + '/datasources/',
{id:-1,
 name:'AutomationTest', 
 description: 'AuotmationTestPOSTMAN',
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
		.toss();