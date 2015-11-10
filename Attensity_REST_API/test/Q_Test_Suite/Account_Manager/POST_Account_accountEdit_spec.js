/* jasmine-node POST_Account_accountEdit_spec.js 
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
var AccountID = credentials.AccountID
require('../BO_API_TESTSUITE_spec.js');
var id = json.id

frisby.create('POST Account Edit')
	.post(xBO_AUTH_URL + restAccount + 'account',
	{
		id: id,
		name:'MyTestAccount1',
		contactName:'Pumpkin Man',
		contactEmail:'test@attensity.com',
		address:'123 Halloween Street',
		maxUserLimit:5,
		maxTopicLimit:35,
		domainId: 3  
	})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Account Edit<<<<<=====')})
	.toss();