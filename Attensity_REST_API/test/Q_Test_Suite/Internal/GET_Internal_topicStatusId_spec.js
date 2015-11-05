/* jasmine-node GET_Internal_topicStatusId_spec.js
   ARTSA-xxx
   Updated on November 04, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restInternal = configuration.restInternal;
var topic = credentials.LongRunTopicID;

require('../BO_API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('GET Internal Topic Status ID')
		.get(xBO_AUTH_URL + restInternal + 'internal/topic_status/' + topic)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Internal Topic Status ID<<<<<=====')})
		.toss();