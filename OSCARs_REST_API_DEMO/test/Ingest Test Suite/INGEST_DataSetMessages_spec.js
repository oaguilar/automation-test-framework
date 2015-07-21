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

require('./INGEST_DataSourceDataIngestInput_spec.js');
var dataSetId = json.dataSetId
var dataSourceId = json.dataSourceId

frisby.create('Data Set Messages')
//Retrieves Data Source ID
	.post(INGEST_URL + restPipeline + '/datasets/messages',
	{dataSourceId:dataSourceId, dataSetId:dataSetId})
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Data Set Messages<<<<<=====')})
.toss();