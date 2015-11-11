/* jasmine-node POST_Account_accountUnique_spec.js 
	ARTSA-5177
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

frisby.create('POST Account Unique')
	.post(xBO_AUTH_URL + restAccount + 'account/unique',
	{
		name: 'myunqiueAccountname'
	})
		.expectStatus(200)
/* 		.inspectJSON()
		.expectJSON({unique: true}) */
		.after(function() {console.log('=====>>>>>End Of POST Account Unique<<<<<=====')})
	.toss();