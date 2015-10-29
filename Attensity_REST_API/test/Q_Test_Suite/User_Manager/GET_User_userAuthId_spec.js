/* jasmine-node GET_User_userAuthId_spec.js 
   ARTSA-5065
   Updated on October 21, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	
	
var xURL = configuration.xURL;
var restUser = configuration.restUser;

/* require('./Q_API_TEST_UserAuth_spec.js');
var id = json.id
 */
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('GET User Auth ID')
		.get(xURL + restUser +  'auth/' + id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of GET User Auth ID<<<<<=====')})
		.toss();