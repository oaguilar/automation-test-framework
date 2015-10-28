/* jasmine-node Q_API_TEST_FieldsMap_spec.js
   ARTSA-4981
   Updated on April 20, 2015 */

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
var xURL = configuration.xURL;
var restQuery = configuration.restQuery;
require('../Q_API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('fieldsmap')
		.get(xURL + restQuery +  '/fieldsmap')
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of fieldsmap<<<<<=====')})
		.toss();