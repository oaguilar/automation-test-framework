/* jasmine-node PUT_Kermit_eltemplates_spec.js
   ARTSA-xxxx
   Updated on November 04, 2015 */

var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xURL = configuration.xURL;
var restKermit = configuration.restKermit;
require('./POST_Kermit_eltemplates_spec.js');
var id = json.id
var revID = json.revID

    frisby.create('PUT eltemplates')
		.put(xURL + restKermit + 'core/eltemplates/' + id,
				{
				    id: id,
					revID: revID,
					username: 'johndoe',
					templateName : 'Blockbuster film',
					description : 'Template for Entity Lists dealing with large film releases PUT',
					entityDefinitions : 
			[
				{
					entityTypeTemplate: 'DIRECTOR',
					label: 'Director Name',
					order: 2,
					minInstances: 1,
					maxInstances: 1,
					dataType: 'STRING',
					minValue: '',
					maxValue: ''
				},
				{
					entityTypeTemplate: 'ACTOR',
					label: 'Actor Name',
					order: 2,
					minInstances:'' ,
					maxInstances:'',
					dataType: 'STRING',
					minValue:'' ,
					maxValue:'' 
				},
				{
					entityTypeTemplate: 'RELEASE_DATE',
					label: 'Release Date',
					order: 2,
					minInstances: 1,
					maxInstances: 1,
					dataType: 'DATE_TIME',
					minValue: '01/01/1900',
					maxValue: ''
				}
			]
		})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of PUT eltemplates<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		 require('./GET_Kermit_eltemplatesId_spec.js');
		 require('./DELETE_Kermit_eltemplatesId_spec.js');
		}).toss();

