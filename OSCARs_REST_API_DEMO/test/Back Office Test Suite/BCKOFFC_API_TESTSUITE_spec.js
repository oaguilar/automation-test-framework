/* jasmine-node Q_API_TEST_BOUSERAUTH_ADMIN_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'BO_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var BackofficeQA = configuration.BackofficeQA;
var accountAuthService = configuration.accountAuthService;
var userAccount = configuration.userAccount;
var passwordAccount = configuration.passwordAccount;

	frisby.create('AccountAuthentication')
	//authenticates the user to Account Manager
		.post(BackofficeQA + accountAuthService,
		{username : userAccount, password: passwordAccount},
		{json: true},
		{headers: {'Content-Type': 'application/json' }}
		)
		.expectStatus(200)
		.expectHeader('Content-Type', 'application/json')
		.expectJSON({
				enabled: true,
				loginFailed: false
		})
		.expectJSONTypes({
				authkey: String,
				account: Number
		})
	    .after(function() {console.log('=====>>>>>End Of Account Authentication<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: {	'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)   
		});




//BACK OFFICE TESTSUITE//

//require('./BO_API_TEST_ACCT_spec.js');

require('./BO_API_TEST_ACCTAUTH_spec.js');
require('./BO_API_TEST_ACCTAUTH_ADMIN_spec.js');
require('./BO_API_TEST_ACCTAUTH_EDITOR_spec.js');
require('./BO_API_TEST_ACCTAUTH_READONLY_spec.js');
//require('./BO_API_TEST_ACCTAUTH_LOGIN_spec.js');
require('./BO_API_TEST_ACCT_PARAM_spec.js');

//require('./zbo_spec.js');


		}).toss();
