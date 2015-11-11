/* jasmine-node PUT_Account_accountUser_spec.js 
	ARTSA-5174
*/

var frisby = require('frisby');

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
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;
require('../BO_API_TESTSUITE_spec.js');
var id = json.id
require('./POST_Account_accountUser_spec.js');
var idu = json.id



frisby.create('PUT Account User')
	.put(xBO_AUTH_URL + restAccount + 'user/' + id,
	{
        username: 'admin999',
        email: 'smarchant@attensity.com',
        account: id,
        id: idu,
        enabled: true,
        admin: true,
        allowEditTopic: true,
        accountAdminUser: false,
        loginFailed: false,
        accessEli: true,
        accessTempEditorEli: true
    })
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of PUT Account User<<<<<=====')})
	.toss();