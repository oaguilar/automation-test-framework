/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

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
var QQA = configuration.QQA;
var restQuery = configuration.restQuery;
var topic = configuration.autoLongRunTopicID;

	frisby.create('Demographics - Location of Mentions')
		.post(QQA + restQuery + '/aggregate',
		{ topicIDs:[topic], 
		 limit:0,
		 filters:[],
		 dateRange:{ startDate:START_DT, endDate:END_DT},
		selectedFields:[{"field":"author_country", "sortDirection":"ASCENDING"},{"field":"content_volume()", "sortDirection":"DESCENDING"}]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Demographics - Location of Mentions<<<<<=====')})
		.toss();
