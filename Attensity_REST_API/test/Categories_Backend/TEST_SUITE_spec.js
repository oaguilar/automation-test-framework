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
var username = configuration.username;
var password = configuration.password;
var accountName = configuration.accountName;
var auth_url = configuration.AUTH_URL;

//Generates UToken for User//
	frisby.create('UToken - User')
		.post(auth_url,
		{ username : username, password: password, accountName: accountName},
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

//Callback UToken for all other REST API Service Calls//
    frisby.globalSetup({
      request: { 
		headers: { 'utoken': res.authkey, 'Content-Type': 'application/json' },
		json: true },
		timeout: (400 * 1000)  
	 });
	 
		//POST calls
		require('./POST_rest_categorization_spec.js');
		require('./POST_copy_generate_topic_catset_spec.js');  //Interferes with `copy_generate_template_from_nontempcatset`
		require('./POST_copy_generate_topic_catset_fakecatsetID_spec.js'); 
		require('./POST_copy_generate_topic_catset_faketopicID_spec.js'); 
		require('./POST_copy_generate_topic_catset_deletedtopicID_spec.js');
		require('./POST_copy_generate_topic_catset_OOBtemp_spec.js'); //Interferes with `copy_generate_template_from_nontempcatset`
		require('./POST_copy_generate_template_from_catset_spec.js');
		require('./POST_copy_generate_template_from_catset_faketopicID_spec.js');
		require('./POST_copy_generate_template_from_catset_fakecatsetID_spec.js'); //put other temp-from-catset call after this line
		//require('./POST_copy_generate_template_from_nontempcatset_spec.js');  //Interfered with by generate_topic_catset & generate_topic_catset_OOBtemp
		require('./POST_copy_generate_template_from_OOBcatset_spec.js');
		require('./POST_copy_generate_template_from_catset_deletedtopicID_spec.js');
		
		//GET calls
		require('./GET_rest_categories_spec.js');
		require('./GET_rest_categories_catID_spec.js');
		require('./GET_rest_categories_catID_fakecatsetID_spec.js');
		require('./GET_rest_categories_template=true_editable=false_spec.js');
		require('./GET_rest_categories_template=true_editable=true_spec.js');
		require('./GET_rest_categories_template=false_editable=true_spec.js');
		
		//DELETE calls
		require('./DELETE_rest_categories_emptytemp_spec.js');
		require('./DELETE_rest_categories_OOBtemplate_spec.js');
		require('./DELETE_rest_categories_ALL_spec.js');
		require('./DELETE_rest_categories_topic_catset_spec.js');
		require('./DELETE_rest_categories_template_from_catset_spec.js');
		require('./DELETE_rest_categories_OOBcopy_spec.js');

   }).toss();
