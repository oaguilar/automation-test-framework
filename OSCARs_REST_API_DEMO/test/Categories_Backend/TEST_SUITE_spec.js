/* jasmine-node Q_POST_REST/CATEGORIES_spec.js */
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
	 
		require('./POST_rest_categorization_spec.js');
   }).toss();
