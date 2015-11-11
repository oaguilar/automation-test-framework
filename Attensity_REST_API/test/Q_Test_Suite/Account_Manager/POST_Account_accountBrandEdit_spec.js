/* jasmine-node POST_Account_accountBrandEdit_spec.js 
	ARTSA-5172
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


frisby.create('GET AccountBrand Edit')
//Retrieves list of all account brands
	.post(xBO_AUTH_URL + restAccount + 'account',
	{
        id: AccountID,
        name: 'oaguilarBranding',
        accountType: 0,
        allowHistory: 1,
        brand: 'legos'
	})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET Account Brand Edit<<<<<=====')})
	.toss();