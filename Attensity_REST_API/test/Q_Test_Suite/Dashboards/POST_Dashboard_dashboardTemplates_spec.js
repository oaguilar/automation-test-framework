/* jasmine-node POST_Dashboard_dashboardTemplates_spec.js
   ARTSA-3836
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

    frisby.create('POST dashboard templates')
		.post(xURL + restDashboard + 'dashboards/templates',
		{
        id: -1,
        name: 'SocialTwo1',
        dashboards: [
            {
                id: 1,
                name: 'Overview'
            },
            {
                id: 2,
                name: 'Stream'
            },
            {
                id: 3,
                name: 'Discovery'
            },
            {
                id: 4,
                name: 'Demographics'
            },
            {
                id: 5,
                name: 'Top Influencers'
            },
            {
                id: 6,
                name: 'Company Sentiment'
            }
        ]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST dashboard templates<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		 require('./DELETE_Dashboard_dashboardTemplate_spec.js');
		 }).toss();
