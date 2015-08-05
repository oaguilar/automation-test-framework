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
var IngestDataSet = configuration.IngestDataSet;

require('./INGEST_TESTSUITE_spec.js');
var id = json.id

frisby.create('Data Source Data Ingest Input')
	.post(INGEST_URL + restPipeline + '/datasets/',
	{
	dataSourceId: id,
	rowCount: 1,
	records: [['US Constitution title', 
	'some name1', 
	'OSCAR',
	'OSCAR US Constitution 1st comment, Oscar 2nd A message',
	'',
	'6/10/2015',
	40,
	'37.452960:-132.181725'],
	['this is second nice title',
	'some name1',
	'Elisabeth',
	'Elisabeth US Constitution 1st comment, Elisabeth 2nd A message',
	'',
	'6/10/2015',
	20,
	'47.452960:-132.181725']]
	})
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Data Source Data Ingest Input<<<<<=====')})
	//Callback Topic ID for REST API Service Calls//
	.afterJSON(function(json) {
		var dataSetId = json.dataSetId
		var dataSourceId = json.dataSourceId
		
		require ('./INGEST_DataSetMessages_spec.js');
		
	}).toss();

