/* 	jasmine-node GET_Articles_loadSourceFields_spec.js 
	ARTSA-5220
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

	frisby.create('GET load source fields')
		.get(xURL + restArticles + 'query/loadsourcefields')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET load source fields<<<<<=====')})
		.toss();