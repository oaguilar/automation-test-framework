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
var restPipeline = configuration.restPipeline;

require('./INGEST_TESTSUITE_spec.js');
var id = json.id

frisby.create('Delete Datasource')
	.delete(INGEST_URL + restPipeline + '/datasources',
	{
     id: id,
     name: 'AutomationIngest',
     description: 'AutomationIngest',
     account: 10012
	})
	.expectStatus(200)
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Delete Datasource<<<<<=====')})
	.toss();