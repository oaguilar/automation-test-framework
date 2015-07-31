/* jasmine-node GET_rest_categories_temp=F&edit=T_spec.js */
//This test returns an empty set for the system-admin account.

var frisby = require('frisby');
var fs, configurationFile;
	configurationFile = 'configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
var QHTTP = configuration.QHTTP;
var URL_RESTKITKAT = configuration.URL_RESTKITKAT;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
frisby.create('GET list OOB catsets for the system admin')
//GET list OOB catsets for the system admin
	.get(QHTTP + URL_RESTKITKAT + '/?template=false&editable=true')
	.expectStatus(200)
	.inspectJSON()
    .after(function() {console.log('=====>>>>>End Of GET template=F & editable=T<<<<<=====')})		
	.toss();