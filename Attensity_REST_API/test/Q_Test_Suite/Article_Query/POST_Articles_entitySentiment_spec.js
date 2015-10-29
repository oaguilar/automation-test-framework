/* jasmine-node POST_Articles_entitySentiment_spec.js
   ARTSA-4980
   Updated on April 20, 2015 */

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	

var sd = moment().subtract(714, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var START_DT = sm.unix()
var END_DT = em.unix()
var LIMIT = 10
var xURL = configuration.xURL;
var LongRunTopicID = credentials.LongRunTopicID;
var dataSourceIdField1 = configuration.dataSourceIdField1;
var dataSourceIdField2 = configuration.dataSourceIdField2;
var restArticles = configuration.restArticles;
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('POST entitysentiment')
		.post(xURL + restArticles + 'query/entitysentiment',
		{ topicIDs:[LongRunTopicID],
		  limit: 75,
		  filters:[
		    {field:'872.overall_score',comparison:'GT',values:[0]},
			{field:'category_level1', comparison:'CO_OCCURS',values:['Themes_Category_Set']},
			{field:'category_level2',comparison:'CO_OCCURS',values:['Operations & Process','Corporate','Website','Price','Service & Staff','Products','Marketing']}	
		  ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST entitysentiment<<<<<=====')})
		.toss();