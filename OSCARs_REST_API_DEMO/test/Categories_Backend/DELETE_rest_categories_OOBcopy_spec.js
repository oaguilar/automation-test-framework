/* jasmine-node DELETE_rest_categories_OOBcopy_spec.js */
//This test deletes an OOB-copied catset.

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
frisby.create('Creates an OOB-copied catset')
//Post creates an OOB-copied catset. 
	.post(QHTTP + URL_RESTKITKAT_COPY, 
	{
		topic:(topicID),
		name:'copy of topic catset to delete',
		category_set:(catsetID)
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create OOB-copied catset Post<<<<<=====')})			
	.afterJSON(function(json) {
		var catsetid = json.id

//Deletes the OOB copy created above.
frisby.create('OOB-copied catset Delete')	
	.delete(QHTTP + URL_RESTKITKAT + '/' + catsetid)
	.expectStatus(200)
    .after(function() {console.log('=====>>>>>End Of OOB-copy Delete<<<<<=====')})
	.toss();

	}).toss();