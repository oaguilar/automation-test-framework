/* jasmine-node GET_Topic_articleQuery_spec.js
   ARTSA-4990
   Updated on April 20, 2015 */

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

	var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
var topic = credentials.LongRunTopicID;

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('GET Topic List')
		.get(xURL + restTopic + 'topic')  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Topic List<<<<<=====')})
		.toss();