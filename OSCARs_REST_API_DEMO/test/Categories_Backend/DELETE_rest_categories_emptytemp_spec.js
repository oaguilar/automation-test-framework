/* jasmine-node DELETE_rest_categories_emptytemplate_spec.js */
//This test deletes an empty template that was created.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;
var topicID = configuration.topic_id;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('Creates an empty cat_set template')
//Creates an empty cat_set template in Q. 
	.post(QHTTP + URL_RESTKITKAT, {
    topic:(topicID),
    name:'CatSet to delete'
	})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of cat_set POST<<<<<=====')})
	.afterJSON(function(json) {
		var catsetid = json.id

//Deletes the cat_set template  created above.
frisby.create('Empty cat_set Delete')	
	.delete(QHTTP + URL_RESTKITKAT + '/' + catsetid)
	.expectStatus(200)
    .after(function() {console.log('=====>>>>>End Of cat_set Delete<<<<<=====')})
	.toss();
}).toss();