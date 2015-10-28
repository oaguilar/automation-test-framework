/* jasmine-node GET_Topic_dataSourceUI_spec.js
   ARTSA-5007
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

	frisby.create('GET DataSource UI')
	.get(xURL + restTopic + 'topic/datasources_ui')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET DataSource UI<<<<<=====')})
.toss();