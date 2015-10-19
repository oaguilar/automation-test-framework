/* jasmine-node Q_API_TEST_ACCOUNT_spec.js */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var BackofficeQA = configuration.BackofficeQA;
var accountService = configuration.accountService;

frisby.create('GetAccountBrandList')
//Retrieves list of all account brands
	.get(BackofficeQA + '/' + accountService + '/brands')
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of Get Account Brand List<<<<<=====')})
	.toss();