/* jasmine-node GET_Topic_topicAuditTrail_spec.js
   ARTSA-4987
   Updated on April 20, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;

require('../API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('GET Topic Audit Trail')
		.get(xURL + restTopic + 'topic/topicAudit/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Topic Audit Trail<<<<<=====')})
		.toss();