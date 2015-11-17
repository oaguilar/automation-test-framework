 /* jasmine-node DELETE_Kermit_entitylists_spec.js
   ARTSA-xxxx
   Updated on November 16, 2015 */

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restKermit = configuration.restKermit;
require('./POST_Kermit_entitylists_spec.js');
var id = json.id

    frisby.create('DELETE eltemplates')
		.post(xURL + restKermit + 'core/entitylists' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of DELETE eltemplates<<<<<=====')})
		.toss();


 
 
 
