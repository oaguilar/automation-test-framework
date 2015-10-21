/* jasmine-node Q_API_TEST_Get_TOPICDataSource_spec.js
   ARTSA-xxxx
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
/* require('../Q_API_TESTSUITE_spec.js');
var id = json.id */

frisby.create('Topic DataSources')
//Retrieves Topic Datasources
	.get(xURL + restTopic + '/datasources/')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Topic DataSources<<<<<=====')})
	.toss();