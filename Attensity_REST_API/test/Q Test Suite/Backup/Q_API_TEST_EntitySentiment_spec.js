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
var sd = moment();
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var QQA = configuration.QQA;
var autoLongRunTopicID = configuration.autoLongRunTopicID;
var dataSourceIdField1 = configuration.dataSourceIdField1;
var dataSourceIdField2 = configuration.dataSourceIdField2;
var restQuery = configuration.restQuery;
require('./Q_API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('entitysentiment')
		.post(QQA + restQuery + '/entitysentiment',
		{ topicIDs:[autoLongRunTopicID],
		  limit: 75,
		  filters:[
		    {field: dataSourceIdField1},
			{field: dataSourceIdField2},
			{field:'category_level1', comparison:'CO_OCCURS',values:['Themes_Category_Set']},
			{field:'category_level2',comparison:'CO_OCCURS',values:['Operations & Process','Corporate','Website','Price','Service & Staff','Products','Marketing']}	
		  ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of entitysentiment<<<<<=====')})
		.toss();