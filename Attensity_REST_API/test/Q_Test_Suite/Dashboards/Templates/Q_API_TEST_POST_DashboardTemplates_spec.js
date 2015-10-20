/* jasmine-node Q_API_TEST_POST_DashboardTemplates_spec.js
   ARTSA-3836
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

    frisby.create('[post] dashboard templates')
		.post(xURL + restDash + '/dashboards/templates',
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
		.after(function() {console.log('=====>>>>>End Of [POST]dashboard templates<<<<<=====')})
		.toss();
