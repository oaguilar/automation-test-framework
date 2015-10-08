/* jasmine-node POST_generate_template_from_a_nontemplate_catset_spec.js */
//This test cannot create a template because of fakecatsetID.

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
var fakecatsetID = configuration.fakecatset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Create a template from a catset')
//Post cannot create a template from a catset because of fakecatsetID. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(topicID),
    name:"QA Testing",
    category_set:(fakecatsetID)
	})
	.expectStatus(404)
    .after(function() {console.log('=====>>>>>End Of Create template from catset faketopicID Post<<<<<=====')})		
	.toss();