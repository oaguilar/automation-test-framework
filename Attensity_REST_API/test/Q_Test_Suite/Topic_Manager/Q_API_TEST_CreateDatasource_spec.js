/* jasmine-node Q_API_TEST_CreateDatasource_spec.js */

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'Q_configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var xURL = configuration.xURL;
var restTopic = configuration.restTopic;

frisby.create('Create New Datasource')
	.post(xURL + restTopic + '/datasources',
{
  name: 'Automation Hospitality Data',
  account: 10096,
  fields: [
    {
      name: 'DataId',
      display_name: 'DataId',
      title: 'DataId',
      type: 'int',
      usage: [
        'original_content_id'
      ]
    },
    {
      name: 'brand',
      display_name: 'brand',
      title:  'brand',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'check_in_date',
      display_name: 'check_in_date',
      title:  'check_in_date',
      type: 'date',
      usage: [
        'creation_date'
      ]
    },
    {
      name: 'check_out_date',
      display_name: 'check_out_date',
      title:  'check_out_date',
      type: 'date',
      usage: [
        'structured'
      ]
    },
    {
      name: 'check_out_month',
      display_name: 'check_out_month',
      title:  'check_out_month',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'check_out_year',
      display_name: 'check_out_year',
      title:  'check_out_year',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'section',
      display_name: 'section',
      title:  'section',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'gender',
      display_name: 'gender',
      title:  'gender',
      type: 'string',
      length: 10,
      usage: [
        'gender'
      ]
    },
    {
      name: 'hotel_country',
      display_name: 'hotel_country',
      title:  'hotel_country',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'room_number',
      display_name: 'room_number',
      title:  'room_number',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'location_id',
      display_name: 'location_id',
      title:  'location_id',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'reason_for_stay',
      display_name: 'reason_for_stay',
      title:  'reason_for_stay',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'response_date',
      display_name: 'response_date',
      title:  'response_date',
      type: 'date',
      usage: [
        'structured'
      ]
    },
    {
      name: 'membership_level',
      display_name: 'membership_level',
      title:  'membership_level',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'why_you_chose_this_hotel',
      display_name: 'why_you_chose_this_hotel',
      title:  'why_you_chose_this_hotel',
      type: 'string',
      length: 256,
      usage: [
        'structured'
      ]
    },
    {
      name: 'likely_to_recommend',
      display_name: 'likely_to_recommend',
      title:  'likely_to_recommend',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'likely_to_return_to_hotel',
      display_name: 'likely_to_return_to_hotel',
      title:  'likely_to_return_to_hotel',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'likely_to_stay_at_brand',
      display_name: 'likely_to_stay_at_brand',
      title:  'likely_to_stay_at_brand',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'loyaltystatus',
      display_name: 'loyaltystatus',
      title:  'loyaltystatus',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'overall_score',
      display_name: 'overall_score',
      title:  'overall_score',
      type: 'int',
      usage: [
        'structured'
      ]
    },
    {
      name: 'document_text',
      display_name: 'document_text',
      title:  'document_text',
      type: 'string',
      usage: [
        'annotate'
      ]
    }
  ]
})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of Create New Datasource<<<<<=====')})
		//Callback Topic ID for REST API Service Calls//
		.afterJSON(function(json) {
		var id = json.id
		require('./Q_API_TEST_Get_TOPICDataSourceID_spec.js');
		require('./Q_API_TEST_DataSourceDelete_spec.js');
		}).toss();