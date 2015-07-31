/* jasmine-node POST_create_topic_catset_fakecatsetID_spec.js */
//This test cannot create a topic catset because of a fakecatsetID.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT_COPY = configuration.URL_RESTKITKAT_COPY;
var topicID = configuration.topic_id;
//var catsetID = configuration.catset_id;
var fakecatsetID = configuration.fakecatset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Tries to create topic catset, but cannnot because of fakecatsetID')
//Post cannot create topic catset because of fakecatsetID 
	.post(QHTTP + URL_RESTKITKAT_COPY, 
	{
		topic:(topicID),
		name:'QA_Testing',
		template:(fakecatsetID)
	})
	.expectStatus(404)
    .after(function() {console.log('=====>>>>>End Of Create topic catset fakecatsetID<=====')})		
	.toss();