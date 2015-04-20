/* jasmine-node Q_API_TEST_LOGINREMINDER_spec.js */

var nodemailer = require('nodemailer');
var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var IP01 = configuration.IP01;
var URL = configuration.URL_RESTUSR;
var transport = nodemailer.createTransport(URL + '/account');

    frisby.create('Send Account Name Reminder Email')
		.post(URL + '/loginReminder/account',
		{ 
			email:'oaguilar@attensity.com'
		})
		.inspectBody()
		.expectBodyContains('')
	.toss()