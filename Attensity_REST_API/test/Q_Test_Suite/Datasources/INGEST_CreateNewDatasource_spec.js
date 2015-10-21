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
var restPipeline = configuration.restPipeline;

frisby.create('Create New Datasource')
	.post(INGEST_URL + restPipeline + '/datasources/',
{
	id: -1,
	name: 'AutomationIngest',
	description: 'AutomationIngest',
	type: 'comment',
	account: 10012,
	fields: [{
		name: 'so',
		display_name: 'title',
		title: 'bla title',
		type: 'string',
		usage: ['document_title']
	},
	{
		name: 'name',
		display_name: 'name',
		title: 'name',
		type: 'string',
		usage: ['pass-through']
	},
	{
		name: 'author',
		display_name: 'author',
		title: 'author',
		type: 'string',
		usage: ['person_name']
	},
	{
		name: 'comment',
		display_name: 'survey',
		title: 'survey question',
		type: 'string',
		usage: ['annotate']
	},
	{
		name: 'answer',
		display_name: 'survey',
		title: 'survey question',
		type: 'string',
		usage: ['annotate']
	},
	{
		name: 'sex',
		display_name: 'gender',
		title: 'gender',
		type: 'string',
		usage: ['gender']
	},
	{
		name: 'dateCreated',
		display_name: 'creation date',
		title: 'creation date',
		type: 'string',
		usage: ['creation_date']
	},
	{
		name: 'age',
		display_name: 'age',
		title: 'age',
		type: 'int',
		usage: ['age']
	},
	{
		name: 'pas',
		display_name: 'pass',
		title: 'passo',
		type: 'int',
		usage: ['pass-through']
	},
	{
		name: 'latlongpass',
		display_name: 'latlongpass',
		title: 'latlongpass',
		type: 'int',
		usage: ['latitude_longitude', 'pass-through']
	}]
})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Create New Datasource<<<<<=====')})
		//Callback Topic ID for REST API Service Calls//
		.afterJSON(function(json) {
		var id = json.id
		require('./INGEST_DeleteDatasource_spec.js');
		}).toss();