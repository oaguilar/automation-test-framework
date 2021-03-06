/* jasmine-node Q_API_TEST_GET_TOPICDataSourceID_spec.js
   ARTSA-5009
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

	frisby.create('Topic DataSource ID')
	.get(xURL + restTopic + '/datasources/' + id)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Topic DataSource ID<<<<<=====')})
.toss();