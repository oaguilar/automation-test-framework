/* jasmine-node GET_Topic_topicId_spec.js
   ARTSA-5010
   Updated on October 21, 2015 */

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

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Topic ID')
		.get(xURL + restTopic + 'topic/' + id)  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Topic ID<<<<<=====')})
		.toss();