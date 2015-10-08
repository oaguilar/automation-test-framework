/* jasmine-node POST_rest_categorization_spec.js */
//This test creates an edits an account repeatedly, testing all supported accountType, accountLanguage, maxTopicLimit, and maxTopicVolume values.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;
var topicID = configuration.topic_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post empty cat_set template')
//Posts an empty cat_set template in Q. 
	.post(QHTTP + URL_RESTKITKAT, {
    topic:(topicID),
    name:'Oscar automation cs'
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of cat_set Post<<<<<=====')})		
	.toss();