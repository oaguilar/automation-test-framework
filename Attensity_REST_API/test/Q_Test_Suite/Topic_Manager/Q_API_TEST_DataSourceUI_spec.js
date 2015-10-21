/* jasmine-node Q_API_TEST_DataSourceUI_spec.js
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
require('./Q_API_TEST_CreateDatasource_spec.js');
var id = json.id	

	frisby.create('DataSource UI')
	.get(xURL + restTopic + '/datasources_ui')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of DataSource UI<<<<<=====')})
.toss();