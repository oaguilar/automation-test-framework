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

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    frisby.create('POST Login Reminder Account')
		.addHeader('Cookie', ' wp10059=UTTYCDDDDDDBMHWWLKC-KVXZ-XCCH-CKMM-WKUUVXBCTCWYDYBVMXCMZ-ZHBL-XALH-BWLT-LZZVLKABVLUHDHmmLglpmR_Jht; _ga=GA1.2.1306413724.1443148872;attensity-authkey=undefined')
		.addHeader('Accept', 'application/json')
		.addHeader('Host', 'stage-q.attensity.com')
		.addHeader('Connection', 'keep-alive')
		.post('https://stage-q.attensity.com/sidekick-user/rest/loginReminder/account',
		{ email: 'oaguilar@attensity.com'},
		{ json: true },
		{ headers: { 'Content-Type': 'application/json' }}
		)
		//.timeout(30000) // 30 second timeout
		.expectStatus(200)
		.after(function() {console.log('=====>>>>>End Of POST Login Reminder Account<<<<<=====')})
		.toss();