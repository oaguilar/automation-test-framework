/* jasmine-node POST_rest_categorization_spec_unauthenticatedUser.js */
//This test tries to create a new category set, but should be unsuccessful because it is an unauthenticated user.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var useraccount = configuration.useraccount;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;
var QHTTP = configuration.QHTTP;
var topicID = configuration.topic_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post empty cat_set with unauthenticated user')
//Post should not be successful. Unauthenticated user. 
	.post(QHTTP + URL_RESTKITKAT, {
    topic:(topicID),
    name:'Oscar abc'
	})
	.expectStatus(401)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of cat_set Post<<<<<=====')})		
	.toss();