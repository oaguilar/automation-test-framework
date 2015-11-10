/* jasmine-node POST_Account_accountUserUnique_spec.js 
	ARTSA-xxx
*/

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
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;

frisby.create('POST Account User Unique')
	.post(xBO_AUTH_URL + restAccount + 'user/unique',
	{
		username: 'myunqiuename'
	})
		.expectStatus(200)
		.inspectJSON()
		.expectJSON({unique: true})
		.after(function() {console.log('=====>>>>>End Of POST Account User Unique<<<<<=====')})
	.toss();