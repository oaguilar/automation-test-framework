/* jasmine-node POST_generate_template_from_OOBcatset_spec.js */
//This test generates a template based on an OOB catset.

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
var OOBcatsetID = configuration.OOBcatset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Create template from an OOB catset')
//Post creates a template from an OOB catset. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(topicID),
    name:"Copy of Oscar automation CatSet",
    category_set:(OOBcatsetID)
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create template from OOBcatset Post<<<<<=====')})		
	.toss();