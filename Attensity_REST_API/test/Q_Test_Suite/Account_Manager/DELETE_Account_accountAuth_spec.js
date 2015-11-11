/* jasmine-node DELETE_Account_accountAuth_spec.js
	ARTSA-5168
*/

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;
require('../BO_API_TESTSUITE_spec.js');
var id = json.id

frisby.create('DELETE Account Auth')
	.delete(xBO_AUTH_URL + restAccount + 'accountauth')
	.expectStatus(200)
	.after(function() {console.log('=====>>>>>End Of DELETE Account Auth<<<<<=====')})
	.toss();