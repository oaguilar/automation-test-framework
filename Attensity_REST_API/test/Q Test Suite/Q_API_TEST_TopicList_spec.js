/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js
   ARTSA-4990
   Updated on April 20, 2015 */

var frisby = require('frisby');
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var sd = moment().subtract(37, 'days');
var sm = moment.unix(sd);
var ed = moment().add(14, 'days');
var em = moment.unix(ed);
var LIMIT = 10
var xURL = configuration.xURL;
var restQuery = configuration.restQuery;
var restTopic = configuration.restTopic;
var topic = configuration.autoLongRunTopicID;
var START_DT = sm.unix();
var END_DT = em.unix();

{
  console.log(sm.unix())
  console.log(em.unix())
}

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('Topic List')
		.get(xURL + restTopic)  
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic List<<<<<=====')})
		.toss();