/* jasmine-node Q_API_TEST_GET_UserAuth_spec.js 
   ARTSA-5064
   Updated on October 21, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xURL = configuration.xURL;
var restUser = configuration.restUser;

    frisby.create('GET User Auth')
		.get(xURL + restUser +  '/auth')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET User Auth<<<<<=====')})
		.toss();