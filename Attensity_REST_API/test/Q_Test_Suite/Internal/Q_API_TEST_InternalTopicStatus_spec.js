/* jasmine-node Q_API_TEST_InternalTopicStatus_spec.js
   ARTSA-xxx
   Updated on October 27, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restInternal = configuration.restInternal;
var topic = configuration.autoLongRunTopicID;

require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('Internal Topic Status')
		.post(xBO_AUTH_URL + restInternal + '/topic_status',
		{
			id: 102636,
			status:{code:'SHUTDOWN',description:'EXPIRED'}
			/*  Update Topic Status Request Options
				code:            "OK"          "WARN"     "SHUTDOWN"
				description:     "OK"          "WARN"     "SHUTDOWN"
			*/
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Internal Topic Status<<<<<=====')})
		.toss();