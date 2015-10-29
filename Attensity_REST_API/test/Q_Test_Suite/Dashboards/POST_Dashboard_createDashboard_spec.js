/* jasmine-node POST_Dashboard_createDashboard_spec.js
   ARTSA-3835
   Updated on October 19, 2015 */

var frisby = require('frisby')
var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var xURL = configuration.xURL;
var restDashboard = configuration.restDashboard;

    frisby.create('dashboard')
		.post(xURL + restDashboard + 'dashboards',
		{
			id: -1,
			name: 'myCompany Sentiment 55',
			account: 10096,
			group: 'SocialFour',
			widgets: '[{"directive": "overview-bar", "attrs": "mini", "col": 1, "row": 1, "size_x":2, "size_y":2 }, { "directive": "business-theme-sentiment", "col": 1, "row": 3, "size_x":2, "size_y":5 }, { "directive": "business-mentions", "row": 9, "size_x":2, "size_y":5]'
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of dashboard<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		 require('./GET_Dashboard_dashboardId_spec.js');
		 require('./DELETE_dashboard_spec.js');
		 }).toss();
