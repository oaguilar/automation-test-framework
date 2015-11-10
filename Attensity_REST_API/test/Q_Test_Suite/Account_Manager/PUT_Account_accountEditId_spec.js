/* jasmine-node PUT_Account_accountEditId_spec.js 
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


frisby.create('PUT Account Edit')
	.put(xBO_AUTH_URL + restAccount + 'account/' + id,
	{
		name:'MyTestAccount232',
		accountType:0,
		expired: false,
		maxUserLimit:5,
		maxTopicLimit:15,
		maxVolumeLimit:80000,
		userCount:1,
		domainId: 3  
	})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of PUT Account Edit ID<<<<<=====')})
	.toss();