/* jasmine-node DELETE_Topic_dataSource_spec.js
   ARTSA-5006
   Updated on October 21, 2015 */

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
	
var AccountID = credentials.AccountID;

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('./POST_Topic_createDatasource_spec.js');
var id = json.id	

	frisby.create('DELETE DataSource Delete')
	.delete(xURL + restTopic + 'topic/datasources',
	{
        id: id,
        account: AccountID
	})
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of DELETE DataSource Delete<<<<<=====')})
.toss();