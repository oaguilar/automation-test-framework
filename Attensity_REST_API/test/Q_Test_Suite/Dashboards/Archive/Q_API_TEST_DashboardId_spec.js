/* jasmine-node Q_API_TEST_DashboardId_spec.js
   ARTSA-3833
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restDash = configuration.restDash;

    frisby.create('dashboard ID')
		.get(xURL + restDash + '/dashboards/1704')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard ID<<<<<=====')})
		.toss();