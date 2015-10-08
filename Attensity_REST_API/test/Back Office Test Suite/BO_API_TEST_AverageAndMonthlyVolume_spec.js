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
var QQA = configuration.QQA;
var accountService = configuration.accountService;
var restQuery = configuration.restQuery;

frisby.create('Get Average And Monthly Volume Report')
//Retrieves Average And Monthly Volume -- Account Management Report
	.get(QQA + restQuery  + '/' + "averageAndMonthlyVolume")
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of Get Average And Monthly Volume Report<<<<<=====')})
	.toss();