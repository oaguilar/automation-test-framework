var app = angular.module('cobaltApp', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/suites',
		{
			controller: 'SuitesController',
			templateUrl: 'app/partials/suites.html'
		})
		.when('/tests',
		{
			controller: 'TestsController',
			templateUrl: 'app/partials/tests.html'
		})
		.when('/tests/:suiteID/:testID',
		{
			controller: 'TestController',
			templateUrl: 'app/partials/test.html'
		})
		.when('/suiteTests/:suiteID',
		{
			controller: 'SuiteTestsController',
			templateUrl: 'app/partials/suiteTests.html'
		})
		.when('/socketMonitors',
		{
			controller: 'SocketMonitorsController',
			templateUrl: 'app/partials/socketMonitors.html'
		})
		.when('/monitor/:socketMonitorID',
		{
			controller: 'MonitorController',
			templateUrl: 'app/partials/monitor.html'
		})
		.when('/messageGuns',
		{
			controller: 'MessageGunsController',
			templateUrl: 'app/partials/messageGuns.html'
		})
		.when('/messageGun/:messageGunID',
		{
			controller: 'GunController',
			templateUrl: 'app/partials/gun.html'
		})
		.otherwise({redirectTo: '/suites' });
});