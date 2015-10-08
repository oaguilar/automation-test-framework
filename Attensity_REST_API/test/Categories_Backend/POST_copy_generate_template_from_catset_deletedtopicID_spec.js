/* jasmine-node POST_generate_template_from_catset_spec.js */
//This test cannot generate a template because faketopicID.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT_COPY = configuration.URL_RESTKITKAT_COPY;
var deletedtopicID = configuration.deletedtopic_id;
var catsetID = configuration.catset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Post- Create a catset for a topic')
//Post cannot create a template from catset because of faketopicID. 
	.post(QHTTP + URL_RESTKITKAT_COPY, {
    topic:(deletedtopicID),
    name:"QA Testing",
    category_set:(catsetID)
	})
	.expectStatus(401)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create template from cat_set deletedtopicID Post<<<<<=====')})		
	.toss();