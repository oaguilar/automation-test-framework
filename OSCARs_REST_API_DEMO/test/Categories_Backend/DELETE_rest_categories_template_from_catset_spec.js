/* jasmine-node DELETE_rest_categories_template_from_catset_spec.js */
//This test deletes a template created from a catset.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;
var URL_RESTKITKAT_COPY = configuration.URL_RESTKITKAT_COPY;
var topicID = configuration.topic_id;
var catsetID = configuration.catset_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Creates an template from a catset')
//Post creates a template from a catset. 
	.post(QHTTP + URL_RESTKITKAT_COPY, 
	{
		topic:(topicID),
		name:'copy of topic catset to delete',
		category_set:(catsetID)
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create topic catset Post<<<<<=====')})			
	.afterJSON(function(json) {
		var catsetid = json.id

//Deletes the template created above.
frisby.create('Template from catset Delete')	
	.delete(QHTTP + URL_RESTKITKAT + '/' + catsetid)
	.expectStatus(200)
    .after(function() {console.log('=====>>>>>End Of Template-from-cat_set Delete<<<<<=====')})
	.toss();

	}).toss();