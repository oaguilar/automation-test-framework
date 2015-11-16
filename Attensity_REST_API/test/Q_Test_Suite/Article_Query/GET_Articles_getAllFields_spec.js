/* 	jasmine-node GET_Articles_getAllFields_spec.js 
	ARTSA-5222
*/

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
	
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restArticles = configuration.restArticles;

	frisby.create('GET get all fields')
		.get(xURL + restArticles + 'query/getallfields')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET get all fields<<<<<=====')})
		.toss();