/* jasmine-node POST_Account_accountUser_spec.js 
	ARTSA-xxx
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

frisby.create('POST Create User')
	.post(xBO_AUTH_URL + restAccount + 'user',
	{	
        id: -1,
        username: 'createUser',
        email: 'email@attensity.com',
        password: 'Admin876',
        account:10096 ,
        enabled: true,
        admin: true,
        allowEditTopic: true,
        accountAdminUser: false,
    	userRole: {id:3},
        loginFailed: false,
        accessEli: true,
        accessTempEditorEli: true
    })
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Create User<<<<<=====')})
		.afterJSON(function(json) {
			require('./PUT_Account_accountUser_spec.js');
			require('./DELETE_Account_accountUser_spec.js');
		})
	.toss();