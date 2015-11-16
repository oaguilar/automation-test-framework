/* 	jasmine-node POST_Articles_detailsById_spec.js 
	ARTSA-5216
*/

var frisby = require('frisby')
var moment = require('moment');
var fs, configurationFile;
	configurationFile = 'configuration.json';
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
var restArticles = configuration.restArticles;
require('../API_TESTSUITE_spec.js');
var id = json.id

	frisby.create('POST details by id')
		.post(xURL + restArticles + 'query/detailsbyid',
			["c69e6c8c22eb1bdf6d6eb798f885eae",
			"58c075a45775d8fb1d17d967ed997796",
			"8b57e11e1d97bafcd014265e0f891c9b",
			"8e99dcc3f946453bcd688a060d689f4a",
			"8af34b15b55e2fca38ab9b0431eaf149",
			"e43aaa8f61dcad8552ad6093a392e070",
			"cda56b483e1413746fcf21adeddc7055"

			/*
			  Fields that should be returned
					  {"field":"articleID"},
					{"field":"length"},
					{"field":"metric"},
					{"field":"offset"},
					{"field":"quality"},
					{"field":"id"},
					{"field":"pipeline_article_id"},
					{"field":"article_uri"},
					{"field":"article_content_type"},
					{"field":"article_content_subtype"},
					{"field":"language"},
					{"field":"article_title"},
					{"field":"author_name"},
					{"field":"article_screen_name"},
					{"field":"author_image_url"},
					{"field":"gender "},
					{"field":"article_klout"},
					{"field":"article_followers"},
					{"field":"following"},
					{"field":"groups "},
					{"field":"reach"},
					{"field":"status_updates"},
					{"field":"article_sentiment"},
					{"field":"article_publisher"},
					{"field":"latitude"},
					{"field":"longitude"},
					{"field":"author_continent"},
					{"field":"author_country"},
					{"field":"author_state"},
					{"field":"author_city"},
					{"field":"author_zip_code"},
					{"field":"article_published_at"},
					{"field":"acquired_at"},
					{"field":"body"},
					{"field":"impressions"}
			*/])
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST details by id<<<<<=====')})
		.toss();