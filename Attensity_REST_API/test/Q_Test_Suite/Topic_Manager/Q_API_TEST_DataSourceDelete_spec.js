/* jasmine-node Q_API_TEST_DataSourceDelete_spec.js
   ARTSA-xxxx
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var fs, configurationFile;
	configurationFile = 'Q_credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var automationAccountID = credentials.automationAccountID;

var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('./Q_API_TEST_CreateDatasource_spec.js');
var id = json.id	

	frisby.create('DataSource Delete')
	.delete(xURL + restTopic + '/datasources',
	{
        id: id,
        account: automationAccountID
	})
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of DataSource Delete<<<<<=====')})
.toss();