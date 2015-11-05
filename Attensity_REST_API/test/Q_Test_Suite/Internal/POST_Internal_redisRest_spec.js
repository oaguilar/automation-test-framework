/* jasmine-node POST_Internal_redisRest_spec.js
   ARTSA-xxx
   Updated on November 04, 2015 */

var frisby = require('frisby');

var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);

var xBO_AUTH_URL = configuration.xBO_AUTH_URL;
var restInternal = configuration.restInternal;

	frisby.create('POST Internal redis-rest')
		.post(xBO_AUTH_URL + restInternal + 'internal/redis_reset')
		.expectStatus(200)
		//.inspectJSON()
		//.expectJSON(Given: "Redis keys updated successfully")
		.after(function() {console.log('=====>>>>>End Of POST Internal redis-rest<<<<<=====')})
		.toss();