/* 	jasmine-node POST_Articles_trendsAndStdDev_spec.js 
	ARTSA-5217
*/

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

	frisby.create('POST trendsAndStdDev')
		.post(xURL + restArticles + 'query/trendsAndStdDev',
			  {
    limit: 0,
    topicIDs: [
        id
    ],
    selectedFields: [
        {
            field: 'article_latest_trend',
            sortDirection: 'ASCENDING'
        },
        {
            field: 'ts_std_dev_upper2',
            sortDirection: 'ASCENDING'
        }
    ],
    filters: [
        {
            field: 'trends_max_version',
            comparison: 'EQ',
            values: [
                42
            ]
        }
    ],
    dateRange: {
        startDate: START_DT,
        originalStartDate: 0,
        endDate: END_DT
    },
    page: 0,
    topN: 0,
    accountId: 0,
    sources: [],
    topicNames: [],
    customerDataSources: false
}
		)
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST trendsAndStdDev<<<<<=====')})
		.toss();
