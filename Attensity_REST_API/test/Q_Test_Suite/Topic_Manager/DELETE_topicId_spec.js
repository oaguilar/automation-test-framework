/* jasmine-node DELETE_topicId_spec.js
   ARTSA-4988
   Updated on April 20, 2015 */

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('../API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('DELETE Topic ID')
		.delete(xURL + restTopic + 'topic/' + id )
	 	.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of DELETE_topicId_spec.js<<<<=====')})
		.toss();