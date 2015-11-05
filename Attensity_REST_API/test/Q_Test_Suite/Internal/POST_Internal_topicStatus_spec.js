/* jasmine-node POST_Internal_topicStatus_spec.js
   ARTSA-xxx
   Updated on October 27, 2015 */

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

	frisby.create('POST Internal Topic Status')
		.post(xBO_AUTH_URL + restInternal + 'internal/topic_status',
		{
			id: topic,
			status:{code:'SHUTDOWN',description:'EXPIRED'}
			/*  Update Topic Status Request Options
				code:            "OK"          "WARN"     "SHUTDOWN"
				description:     "OK"          "WARN"     "SHUTDOWN"
			*/
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Internal Topic Status<<<<<=====')})
		.toss();