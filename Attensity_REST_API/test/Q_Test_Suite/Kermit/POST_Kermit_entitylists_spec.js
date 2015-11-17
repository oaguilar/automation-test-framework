 /* jasmine-node POST_Kermit_entitylists_spec.js
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
require('../API_TESTSUITE_spec.js');
var id = json.id

    frisby.create('POST entitylists')
		.post(xURL + restKermit + 'core/entitylists',
			{
				username: 'johndoe',
				entityListName: 'ExampleList1',
				projectID: '10096-100690-1447711254396',
				templateName: 'MyTemplateName1',
				entityAttributes: {
				Account: 'My Account',
				Vertical: 'My Vertical'
				},
				entities: [
				{
				entity: 'Salt Lake City',
				type: 'CITY',
				label: 'City',
				machineID: '/m/0f2r6',
				variants: [
				'SLC'
				]
				},
				{
				entity: 'Obama',
				type: 'HUMAN',
				label: 'President',
				machineID: '/m/02mjmr'
				},
				{
				entity: 'Coffee',
				type: 'ESSENCE_OF_LIFE',
				label: 'Beverage',
				machineID: '/m/02vqfm',
				variants: [
				'Cup of Joe',
				'Dark Roast',
				'Light Roast'
				]
				},
				{
				entity: 'Something',
				label: 'Something',
				type: 'SOMETHING'
				}
				]
				})
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST entitylists<<<<<=====')})
		.toss();


 
 
 
