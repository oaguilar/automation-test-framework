/* jasmine-node POST_create_topic_catset_spec.js */
//This test creates a topic catset.

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
var catsetID = configuration.catset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Create a topic catset')
//Post creates a topic catset. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(topicID),
    name:'Copy of Oscar automation catset2',
    template:(catsetID)
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create topic catset Post<<<<<=====')})		
	.toss();