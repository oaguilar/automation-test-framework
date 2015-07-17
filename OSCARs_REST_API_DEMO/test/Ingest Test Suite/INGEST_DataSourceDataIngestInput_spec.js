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

frisby.create('Data Source Data Ingest Input')
//Retrieves Data Source ID
	.post(INGEST_URL + restPipeline + '/datasources/3',
	{
	dataSourceId: 122,
	rowCount: 1,
	records: [['obama title', 'some name1', 'OSCAR3', 'OSCAR3 first comment, Alexander first message', 'OSCAR3 some answer','', '6/9/2015', '6/10/2015',
	'Sunnyvale', 40, 'pass through stuff', '37.452960:-132.181725'],
	['this is second nice title',
	'some name1",
	'Elisabeth1",
	'Elisabeth1 first comment, Elisabeth second message",
	'Elisabeth1 some answer too",
	'',
	'6/9/2015',
	'6/10/2015',
	'Palo Alto',
	20,
	"more pass through stuff",
	"47.452960:-132.181725"]]
})
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Data Source Data Ingest Input<<<<<=====')})
.toss();