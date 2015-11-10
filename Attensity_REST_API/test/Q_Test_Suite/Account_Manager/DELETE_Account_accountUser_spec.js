/* jasmine-node DELETE_Account_accountUser_spec.js 
	ARTSA-xxx
*/

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xBO_URL = configuration.xBO_URL;
var restAccount = configuration.restAccount;
require('./POST_Account_accountUser_spec.js');
var id = json.id

frisby.create('DELETE Account User')
	.delete(xBO_URL + restAccount + 'user/' + id)
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of DELETE Account User<<<<<=====')})
	.toss();