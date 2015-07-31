/* jasmine-node POST_generate_template_from_catset_spec.js */
//This test creates a template based on a catset.

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
frisby.create('Post- Create a catset for a topic')
//Post creates a catset for a particular topic. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(topicID),
    name:"Copy of Oscar automation CatSet",
    category_set:(catsetID)
	})
	.expectStatus(401)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create template from catset Post<<<<<=====')})		
	.toss();