/* jasmine-node POST_Articles_timeSeries_spec.js
   ARTSA-4986
   Updated on April 20, 2015 */

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var sd = moment();
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var xURL = configuration.xURL;
var restArticles = configuration.restArticles;
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('POST timeseries')
		.post(xURL + restArticles + 'query/timeseries',
		{ topicIDs:[id], 
		 limit:LIMIT,
		 selectedFields:[
        {field:'content_volume()'},
        {field:'topic_id'},
        {field:'ts_average()'}
		],
		dateRange:{ startDate:START_DT, endDate:END_DT},
		timeSlice:'DAY'})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST timeseries<<<<<=====')})
		.toss();
		