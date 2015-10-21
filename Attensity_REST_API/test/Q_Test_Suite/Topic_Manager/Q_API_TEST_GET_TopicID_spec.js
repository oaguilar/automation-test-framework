/* jasmine-node Q_API_TEST_GET_TopicID_spec.js
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
require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Topic ID')
		.get(xURL + restTopic + '/' + id)  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Topic ID<<<<<=====')})
		.toss();