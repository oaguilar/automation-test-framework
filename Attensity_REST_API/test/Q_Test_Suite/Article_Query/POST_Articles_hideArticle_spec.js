/* 	jasmine-node POST_Articles_hideArticle_spec.js 
	ARTSA-5218
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
require('../API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('POST hide article')
		.post(xURL + restArticles + 'query/hidearticle',
		{ 
			topicID: id, 
			articleID:'655101295796297728' 
		})
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of POST hide article<<<<<=====')})
		.toss();