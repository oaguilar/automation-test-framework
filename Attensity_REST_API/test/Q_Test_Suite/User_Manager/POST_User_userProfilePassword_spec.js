/* jasmine-node POST_User_userProfilePassword_spec.js 
   ARTSA-5068
   Updated on October 21, 2015 */
var frisby = require('frisby')

var fs, configurationFile;
	configurationFile = './configuration.json';
	fs = require('fs'); 
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
	);
	
var fs, configurationFile;
	configurationFile = 'credentials.json';
	fs = require('fs'); 
var credentials = JSON.parse(
    fs.readFileSync(configurationFile)
	);	

var xURL = configuration.xURL;
var restUser = configuration.restUser;
var Username = credentials.Username;
var Password = credentials.Password;
var AccountName = credentials.AccountName;
var AccountID = credentials.AccountID;

    frisby.create('POST User Profile Password')
		.post(xURL + restUser + 'profile/password',
{
    username: Username,
    email: 'oaguilar@attensity.com',
    apikey: '853c3fda',
    account: AccountID,
    enabled: true,
    accountAdminUser: false,
    loginFailed: false,
    id: 100452,
    accountName: AccountName,
    preferences: {
        timeZoneString: 'America/New_York',
		timeZoneOffset: -14400000

    },
    accountType: 0,
    brandName: 'legos',
    expirationDate: 1457935200000,
    userRole: {
        id: 1,
        description: 'Admin',
        roleName: 'admin',
        userPermissions: [
            {
                permissionName: 'create_users',
                permissionDesc: 'Able to create users'
            },
            {
                permissionName: 'edit_users',
                permissionDesc: 'Able to edit users'
            },
            {
                permissionName: 'set_account_level_preferences',
                permissionDesc: 'Able to set Account level preferences'
            },
            {
                permissionName: 'view_account_reports',
                permissionDesc: 'Able to view account reports'
            },
            {
                permissionName: 'create_edit_topics',
                permissionDesc: 'Able to create/edit topics'
            },
            {
                permissionName: 'create_custom_entities',
                permissionDesc: 'Able to create custom entities'
            },
            {
                permissionName: 'apply_filters',
                permissionDesc: 'Able to apply filters'
            },
            {
                permissionName: 'drill_down_article',
                permissionDesc: 'Able to drill down the article'
            },
            {
                permissionName: 'export',
                permissionDesc: 'Able to export the data'
            },
            {
                permissionName: 'share_data_dashboards',
                permissionDesc: 'Able to share the data & dashboards'
            },
            {
                permissionName: 'access_eli',
                permissionDesc: 'Access ELI'
            },
            {
                permissionName: 'access_temp_editor_eli',
                permissionDesc: 'Access Temporary Editor ELI'
            }
        ]
    },
    accountPermissions: [],
    accountLanguages: [
        {
            name: 'English',
            abbreviation: 'en'
        }
    ],
    maxTopicLimit: 15,
	oldpassword: 'Admin1234',
    password: 'Admin12345'
})
		.timeout(30000) // 10 second timeout
		.expectStatus(200)
		.inspectJSON()
		.after(function() {console.log('=====>>>>>End Of POST User Profile Password<<<<<=====')})
		.toss();