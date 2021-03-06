/* jasmine-node Q_API_TEST_TopicAuditTrail_spec.js
   ARTSA-4987
   Updated on April 20, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
var topic = configuration.autoLongRunTopicID;

require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('Topic Audit Trail')
		.get(xURL + restTopic + '/topicAudit/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Audit Trail<<<<<=====')})
		.toss();