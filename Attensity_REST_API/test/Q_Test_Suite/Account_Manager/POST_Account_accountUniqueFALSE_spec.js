/* jasmine-node POST_Account_accountUniqueFALSE_spec.js 
	ARTSA-xxx
*/

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;

frisby.create('POST Account Unique FALSE')
	.addHeader('Accept', 'application/json')
	.post( xBO_AUTH_URL + restAccount + 'account/unique',
	{name: 'testMe'})
		.expectStatus(200)
		//.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Account Unique FALSE<<<<<=====')})
	.toss();