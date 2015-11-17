/* jasmine-node POST_Kermit_eltemplates_spec.js
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

    frisby.create('POST eltemplates')
		.post(xURL + restKermit + 'core/eltemplates',
				{
					username: 'johndoe',
					templateName : 'Blockbuster film',
					description : 'Template for Entity Lists dealing with large film releases',
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
		.after(function() {console.log('=====>>>>>End Of POST eltemplates<<<<<=====')})
		.afterJSON(function(json) {
		 var id = json.id
		 var revID = json.revID
		 require('./PUT_Kermit_eltemplates_spec.js')
		 require('./GET_Kermit_eltemplatesId_spec.js');
		 require('./DELETE_Kermit_eltemplatesId_spec.js');
		}).toss();

