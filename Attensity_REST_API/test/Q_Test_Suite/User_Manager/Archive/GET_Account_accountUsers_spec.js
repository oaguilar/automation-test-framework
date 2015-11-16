/* jasmine-node BO_API_TESTSUITE_spec.js */
/* https://jira.attensity.com/browse/CO-42 */

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
//var accountAuthService = configuration.accountAuthService;
var restAccount = configuration.restAccount;
var boUserName = credentials.boUserName;
var boPassword = credentials.boPassword;

	frisby.create('AccountAuthentication')
	//authenticates the user to Account Manager
		.post(xBO_AUTH_URL + restAccount + 'accountauth',
		{username : boUserName, password: boPassword},
		{json: true},
		{headers: {'Content-Type': 'application/json' }}
		)
		.expectStatus(200)
		//.expectHeader('Content-Type', 'application/json')
		.expectJSON({
				enabled: true,
				loginFailed: false
		})
		.expectJSONTypes({
				authkey: String,
				account: Number
		})
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>End Of Account Authentication<<<<<=====')})
		.afterJSON(function (res) {
	/* include auth token in the header of all future requests (Callback function to run after test is completed. )*/
    frisby.globalSetup({
      request: { 
		headers: {	'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)   
		});

	frisby.create('Create Account')
	//Creates a new account
	.post(xBO_AUTH_URL +  restAccount + 'account',
{
    id: -1,
    name: 'xtest',
    accountType: 0,
    allowHistory: 1,
    accountPermissions: [],
    accountLanguages: [
        {
            abbreviation: 'en'
        }
    ],
    maxVolumeLimit: 80000,
    maxDataLimit: 2,
    maxUserLimit: 5,
    maxTopicLimit: 15,
    expirationDate: 1461736800000,
    contactEmail: 'oaguilar@attensity.com',
    contactName: 'oscar',
    address: '',
    city: '',
    state: '',
    zipCode: null,
    userCount: 1,
    user: {
        username: 'ztestUser',
        email: 'oaguilar@attensity.com',
        password: 'Admin1234',
        updatePassword: false,
        errorMessage: '',
        apikey: '',
        enabled: true,
        admin: true
    },
    domainId: 2,
    expDateValid: true
})
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of Create Account<<<<<=====')})		
	.afterJSON(function(json) {
	 //var id = json.id
	 //var username = json.username
	 //var account = json.account
	// var name = json.name



	//B A C K  O F F I C E  T E S T S U I T E//

	//Account Authentication Admin//
/* 	require('./BO_API_TEST_UserWeakPasswordCreateNew_spec.js');
	require('./BO_API_TEST_AccountUserEdits_spec.js');
	//require('./BO_API_TEST_UserAdminCreateNew_spec.js');
	//require('./BO_API_TEST_UserEditPermissions_spec.js');
	//require('./BO_API_TEST_UserUpdateEmail_spec.js');
	//require('./BO_API_TEST_UserUpdatePassword_spec.js'); */

	//Account//
	//require('./Account_Manager/GET_Account_accountList_spec.js');
	require('./Account_Manager/GET_Account_accountReport_spec.js');
	require('./Account_Manager/GET_Account_accountType_spec.js');
	require('./Account_Manager/GET_Account_accountBrandList_spec.js');
	//require('./BO_API_TEST_AverageAndMonthlyVolume_spec.js');
	//require('./BO_API_TEST_EditAccountPut_spec.js');
	require('./Account_Manager/GET_Account_accountUsers_spec.js');
 
	//Account Authentication Integrity//
	//require('./BO_API_TEST_AccountUsernameInvalid_spec.js');
	//require('./BO_API_TEST_AccountAuthInvalidAccountName_spec.js');
	//require('./BO_API_TEST_AccountPasswordInvalid_spec.js');
	//require('./BO_API_TEST_AccountLoginValid_spec.js');
	require('./Account_Manager/GET_Account_accountAuthSession_spec.js');
/*	
	//Account Users//
	require('./BO_API_TEST_AccountAuthEditor_spec.js');
	require('./BO_API_TEST_AccountAuthReadyOnly_spec.js');
	require('./BO_API_TEST_AccountAuthLogin_spec.js');
	
	//Account PARAM//
	require('./BO_API_TEST_EditAccountPost_spec.js');
	require('./BO_API_TEST_EditAccountPostLang_spec.js');
	require('./BO_API_TEST_EditAccountPostVol_spec.js');
	require('./BO_API_TEST_EditAccountPostMax25_spec.js');
	require('./BO_API_TEST_EditAccountPostMax30_spec.js');
	require('./BO_API_TEST_EditAccountPostMax35_spec.js');
	require('./BO_API_TEST_EditAccountPostMax40_spec.js');
	require('./BO_API_TEST_EditAccountPostMax50_spec.js');
	require('./BO_API_TEST_EditAccountPostMax60_spec.js');
	require('./BO_API_TEST_EditAccountPostMax70_spec.js');
	require('./BO_API_TEST_EditAccountPostMax80_spec.js');
	require('./BO_API_TEST_EditAccountPostMax90_spec.js');
	require('./BO_API_TEST_EditAccountPostMax100_spec.js');
	require('./DELETE_Account_account_spec.js');*/
	
	//Internal//
	require('./Internal/POST_Internal_topicStatus_spec.js');
	require('./Internal/GET_Internal_topicStatusId_spec.js');
	require('./Internal/POST_Internal_redisRest_spec.js');
	
	//Account Termination//
	//require('./BO_API_TEST_AccountTermination_spec.js');
	require('./Account_Manager/DELETE_Account_account_spec.js');
	
	}).toss();
}).toss();
