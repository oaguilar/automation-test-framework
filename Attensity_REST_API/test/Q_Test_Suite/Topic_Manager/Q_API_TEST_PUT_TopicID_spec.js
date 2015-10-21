/* jasmine-node Q_API_TEST_PUT_TopicID_spec.js
   ARTSA-xxxx
   Updated on October 21, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

	var xURL = configuration.xURL;
var restTopic = configuration.restTopic;
require('../Q_API_TESTSUITE_spec.js');
var id = json.id

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	frisby.create('PUT Topic ID')
		.put(xURL + restTopic + '/' + id,  
	{
	  id: id,
	  name: 'myCustomerData2',
	  jsonDefinition: {
		includeAll: [],
		includeAny: [],
		additionalIncludeAny: [],
		exclude: [],
		exactPhrases: [],
		other: [
		  {
			type: 'lang',
			values: [
			  'en'
			]
		  },
		  {
			type: 'content_subtype',
			values: [
			  831
			]
		  },
		  {
			type: 'spam_type_category',
			values: [
			  'drug_related',
			  'for_sale',
			  'giveaways',
			  'celebrity_spam',
			  'updates',
			  'game_postings',
			  'pornography',
			  'job_postings'
			]
		  }
		],
		spam_score: 6,
		luceneQuery: '+(lang:en) -(spam_type_category:drug_related spam_type_category:for_sale spam_type_category:giveaways spam_type_category:celebrity_spam spam_type_category:updates spam_type_category:game_postings spam_type_category:pornography spam_type_category:job_postings) +(content_subtype:831)'
	  },
	  createdDate: 1445029301000,
	  createdBy: 'oscara',
	  modifiedDate: 1445029301000,
	  modifiedBy: 'oscara',
	  topicAlerts: [],
	  account: 10096,
	  status: {
		active: true
	  },
	  startDate: 1445029001000,
	  endDate: 1446249599000,
	  lookbackComplete: 101,
	  discoveryOn: false,
	  templateId: 0,
	  category: 0
	})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of PUT Topic ID<<<<<=====')})
		.toss();