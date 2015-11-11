/* jasmine-node GET_Account_accountBrandList_spec.js 
	ARTSA-5167
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


frisby.create('GET AccountBrandList')
//Retrieves list of all account brands
	.get(xBO_AUTH_URL + restAccount + 'account/brands')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of GET Account Brand List<<<<<=====')})
	.toss();