/* jasmine-node DELETE_Kermit_eltemplatesId_spec.js
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
require('./POST_Kermit_eltemplates_spec.js');
var id = json.id

    frisby.create('DELETE eltemplates ID')
		.delete(xURL + restKermit + 'core/eltemplates/' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of DELETE eltemplates ID<<<<<=====')})
		.toss();