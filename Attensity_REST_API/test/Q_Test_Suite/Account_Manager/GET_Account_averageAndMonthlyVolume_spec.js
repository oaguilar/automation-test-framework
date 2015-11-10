/* jasmine-node GET_Account_averageAndMonthlyVolume_spec.js */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_URL02 = configuration.xBO_URL02;
var restArticles = configuration.restArticles;;

frisby.create('GET Average And Monthly Volume Report')
//Retrieves Average And Monthly Volume -- Account Management Report
	.get(xBO_URL02 + restArticles  + 'query/averageAndMonthlyVolume')
		.expectStatus(200)
		.expectHeaderContains('Content-Type', 'application/json')
	.inspectJSON()
	.after(function() {console.log('=====>>>>>End Of GET Average And Monthly Volume Report<<<<<=====')})
	.toss();