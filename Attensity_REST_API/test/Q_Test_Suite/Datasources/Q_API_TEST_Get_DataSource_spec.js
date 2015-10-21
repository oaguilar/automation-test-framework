/* jasmine-node Q_API_TEST_Get_DataSource_spec.js
   ARTSA-xxxx
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'INGST_configuration.json';
	fs = require('fs'); 

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var INGEST_URL = configuration.INGEST_URL;
var restPipeline = configuration.restPipeline;

frisby.create('DataSources')
//Retrieves All Data Source IDs
	.get(INGEST_URL + restPipeline + '/datasources/')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of DataSources<<<<<=====')})
.toss();