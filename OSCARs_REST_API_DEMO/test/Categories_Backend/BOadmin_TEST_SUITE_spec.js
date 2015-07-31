/* jasmine-node TEST_SUITE_akaParent_spec.js */
/* Updated on JULY 29, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QQA = configuration.QHTTP;
var restKitkat = configuration.URL_RESTKITKAT;
var useraccount = configuration.useraccount;
var passwordaccount = configuration.passwordaccount;
var BO_auth_url = configuration.BO_AUTH_URL;

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(BO_auth_url,
		{ username: useraccount, password: passwordaccount},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }}
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
		.inspectJSON()
	    .after(function() {console.log('=====>>>>>UToken - User Completed<<<<<=====')})
        .afterJSON(function (res) {

//Callback UToken for all other BO-admin REST API Service Calls//
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)  
	 });
	 
		//POST calls
		require('./BOadmin_POST_rest_categorization_spec.js');
		require('./BOadmin_POST_copy_generate_topic_catset_spec.js');
		require('./BOadmin_POST_copy_generate_template_from_catset_spec.js');
		
		//GET calls
		require('./BOadmin_GET_rest_categories_spec.js');
		require('./BOadmin_GET_rest_categories_catID_nonOOB_spec.js');
		require('./BOadmin_GET_rest_categories_catID_OOB_spec.js');
		require('./BOadmin_GET_rest_categories_catID_fakecatsetID_spec.js');
		require('./BOadmin_GET_rest_categories_template=true_editable=false_spec.js');
		require('./BOadmin_GET_rest_categories_template=true_editable=true_spec.js');
		require('./BOadmin_GET_rest_categories_template=false_editable=true_spec.js');
		
		//DELETE calls
		require('./BOadmin_DELETE_rest_categories_emptytemp_spec.js');

   }).toss();
