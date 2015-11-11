/* jasmine-node GET_Account_accountType_spec.js
	 ARTSA-5164
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

frisby.create('GET AccountType')
//Retrieves list of the types of all current accounts
	.get(xBO_AUTH_URL + restAccount + 'account/accountInfo')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
		.expectJSONTypes([{
			id: Number,
			accountType: String}])
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Account Type<<<<<=====')})
	.toss();