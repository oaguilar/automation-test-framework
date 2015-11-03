/* jasmine-node GET_Topic_topicCustomDSId_spec.js
   ARTSA-5009
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

	frisby.create('GET Topic Custom DataSource ID')
	.get('http://qa-q02.attensity.qa:8080' + restTopic + 'topic/topic_customds/' + id)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Topic Custom DataSource ID<<<<<=====')})
.toss();