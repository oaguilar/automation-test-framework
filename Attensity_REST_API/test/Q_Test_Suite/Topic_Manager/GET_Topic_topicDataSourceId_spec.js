/* jasmine-node GET_Topic_topicDataSourceId_spec.js
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
require('./POST_Topic_createDatasource_spec.js');
var id = json.id	

	frisby.create('GET Topic DataSource ID')
	.get(xURL + restTopic + 'topic/datasources/' + id)
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Topic DataSource ID<<<<<=====')})
.toss();