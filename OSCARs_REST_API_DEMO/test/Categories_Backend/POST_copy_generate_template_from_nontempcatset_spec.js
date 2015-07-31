/* jasmine-node POST_generate_template_from_nontemplate_catset_spec.js */
//This test generates a template from a nontemplate-catset.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT_COPY = configuration.URL_RESTKITKAT_COPY;
var topicID2 = configuration.topic_id2;
var nontemplate_catsetID = configuration.nontemplate_catset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Create a template from a nontemplate_catset')
//Post creates a template from a nontemplate_catset. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(topicID2),
    name:"QA Testing",
    category_set:(nontemplate_catsetID)
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create template from nontemplate catset Post<<<<<=====')})		
	.toss();