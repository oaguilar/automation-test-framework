/* jasmine-node POST_Articles_filtersGenderExample_spec.js
   ARTSA-4982
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

	frisby.create('POST Filters - Gender Example')
		.post(xURL + restArticles + 'query/entitysentiment',
		{ topicIDs:[id], 
		 limit:LIMIT,
		 filters:[
			  {field:'article_gender', comparison:'CO_OCCURS', values:['f']} 
				   ],
		dateRange:{ startDate:START_DT, endDate:END_DT}})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST Filters - Gender Example<<<<<=====')})
		.toss();