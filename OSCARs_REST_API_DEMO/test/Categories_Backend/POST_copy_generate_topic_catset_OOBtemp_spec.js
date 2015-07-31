/* jasmine-node POST_generate_topic_catset_OOBtemp_spec.js */
//This test will create a topic catset, copied from an OOB template.

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
var OOBcatsetID = configuration.OOBcatset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- create topic catset from OOB template')
//Post create topic catset from OOB template
	.post(QHTTP + URL_RESTKITKAT_COPY, 
	{
		topic:(topicID),
		name:'QA_Testing',
		template:(OOBcatsetID)
	})
	.expectStatus(200)
    .after(function() {console.log('=====>>>>>End Of Create topic catset OOBtemp<=====')})		
	.toss();