/* jasmine-node GET_Kermit_eltemplatesId_spec.js
   ARTSA-xxxx
   Updated on November 04, 2015 */

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restKermit = configuration.restKermit;
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('GET eltemplates ID')
		.get(xURL + restKermit + 'core/eltemplates/[id]')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET eltemplates ID<<<<<=====')})
		.toss();

