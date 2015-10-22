/* jasmine-node Q_API_TEST_POST_LoginReminderAccount_spec.js 
   ARTSA-xxxx
   Updated on October 21, 2015 */
var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = '../Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restUser = configuration.restUser;

    frisby.create('POST Login Reminder Account')
		.post(xURL + restUser + '/loginReminder/account',
		{ email :'oaguilar'},
		{ json: true},
		{ headers: { 'Content-Type': 'application/json' }}
		)
		.timeout(30000) // 10 second timeout
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of POST Login Reminder Account<<<<<=====')})
		.toss();