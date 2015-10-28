/* jasmine-node Q_API_TEST_OverviewBubbleChart_spec.js
   ARTSA-4983
   Updated on April 20, 2015 */

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var sd = moment().subtract(14, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var xURL = configuration.xURL;
var restQuery = configuration.restQuery;
var topic = configuration.autoLongRunTopicID;


    frisby.create('Overview Bubble Chart')
		.post(xURL + restQuery + '/entitysentiment',
		{ topicIDs:[topic],
		limit:LIMIT,
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Overview Bubble Chart<<<<<=====')})
		.toss();
