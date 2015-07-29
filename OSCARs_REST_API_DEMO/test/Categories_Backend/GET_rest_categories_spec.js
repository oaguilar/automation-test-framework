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

TEST ITSELF STARTS HERE
frisby.create('name of test')

