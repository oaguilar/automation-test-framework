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

require('./INGEST_URL_spec.js');
var id = json.id

//Retrieves All Data Source IDs

frisby.create('Delete Datasource')
	.delete(INGEST_URL + restTopic + '/datasources',
	{
     id: id,
     name: 'AutomationTest',
     description: 'AutomationTest',
     account: 10012
	})
	.expectStatus(200)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Delete Datasource<<<<<=====')})
	.toss();