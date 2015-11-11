/*  jasmine-node POST_Account_accountValidationLogin_spec.js 
	ARTSA-5161												 
*/

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
	
var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restAccount = configuration.restAccount;
var userAccount = credentials.userAccount;
var passwordAccount = credentials.passwordAccount;

//Verifies Username is invalid; Login Failed = true// 
	    frisby.create('Account Username Invalid')
		.post(xBO_AUTH_URL + restAccount + 'accountauth',
		{
		  username:'InvalidUsername',
		  password: passwordAccount
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Username Invalid<<<<<=====')})
		.toss();
		
//Verifies Password is invalid; Login Failed = true// 
	    frisby.create('Account Password Invalid')
		.post(xBO_AUTH_URL + restAccount + 'accountauth',
		{
		  username: userAccount,
		  password:'InvalidPassword'
		})
		.expectStatus(200)
		.expectJSON({loginFailed: true})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Password Invalid<<<<<=====')})
		.toss();
		
//Verifies Back Office Username & Password is valid; Login Failed = false// 
	    frisby.create('Account Login Valid')
		.post(xBO_AUTH_URL + restAccount + 'accountauth',
		{
		  username: userAccount,
		  password: passwordAccount
		})
		.expectStatus(200)
		.expectJSON({loginFailed: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Account Login Valid<<<<<=====')})
		.toss();
