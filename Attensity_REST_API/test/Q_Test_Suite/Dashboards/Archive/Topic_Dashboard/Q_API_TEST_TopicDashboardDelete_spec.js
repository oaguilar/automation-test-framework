/* jasmine-node Q_API_TEST_DashboardDelete_spec.js
   ARTSA-3838
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
require('./Q_API_TEST_POST_Dashboard_spec.js');
var id = id

    frisby.create('dashboard Delete')
		.delete(xURL + restDash + '/dashboards/templates' + '/'+ id)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard Delete<<<<<=====')})
		.toss();