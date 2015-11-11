/* jasmine-node GET_Account_accountUserId_spec.js 
	ARTSA-5176
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
var AccountID =  credentials.AccountID

frisby.create('GET Account User ID')
	.get(xBO_AUTH_URL + restAccount + 'user/account/' + AccountID)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Account User ID<<<<<=====')})
	.toss();