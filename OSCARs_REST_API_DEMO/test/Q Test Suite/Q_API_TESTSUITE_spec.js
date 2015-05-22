/* jasmine-node Q_API_TEST_BOUSERAUTH_ADMIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var accountAuthService = configuration.accountAuthService;
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//UToken Fetch//
	frisby.create('UToken - Back Office Account - TESTSUITE')
		.post(BackofficeQA + accountAuthService,
		{ username : userAccount, password: passwordAccount},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }})
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSONTypes({authkey: String})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>UToken - Back Office Account - TESTSUITE Completed<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: 24000
	 });


var tst01 = require('./Q_API_TEST_BOUSERAUTH_ADMIN_spec.js');
var tst02 = require('./Q_API_TEST_BOUSERAUTH_EDITOR_spec.js');
var tst03 = require('./Q_API_TEST_BOUSERAUTH_READONLY_spec.js');



}).toss();