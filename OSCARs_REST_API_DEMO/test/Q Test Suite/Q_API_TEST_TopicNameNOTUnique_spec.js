/* jasmine-node Q_API_TEST_ARTICLEQUERY_spec.js */
/* Updated on April 20, 2015 */

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
var QQA = configuration.QQA;
var restQuery = configuration.restQuery;
var restTopic = configuration.restTopic;
var topic = configuration.autoLongRunTopicID;
var START_DT = sm.unix();
var END_DT = em.unix();

    frisby.create('Topic Name NOT Unique')
		.post(QQA + restTopic + '/unique',
		{
			name:'Topic Create through API NODE.JS'
		})
		.expectStatus(200)
		.expectJSON({unique: false})
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Topic Name NOT Unique<<<<<=====')})
		.toss();