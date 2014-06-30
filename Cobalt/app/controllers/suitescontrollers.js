app.controller('SuitesController', function ($scope, suitesService) {
	init();
	
	function init() {
		$scope.suites = suitesService.getSuites();
	}
	
	$scope.insertSuite = function () {
		var suiteName = $scope.newSuite.suiteName;
		var suiteShortDesc = $scope.newSuite.suiteShortDesc;
		var suiteDesc = $scope.newSuite.suiteDesc;
		suitesService.insertSuite(suiteName, suiteShortDesc, suiteDesc);
		$scope.newSuite.suiteName = '';
		$scope.newSuite.suiteShortDesc = '';
		$scope.newSuite.suiteDesc = '';
	};
	
	$scope.deleteSuite = function(id) {
		suitesService.deleteSuite(id);
	};
	
});

app.controller('SuiteTestsController', function ($scope, $routeParams, suitesService) {
	$scope.suite = {};
	$scope.totalTests = 0;
	
	init();
	
	function init() {
		var suiteID = ($routeParams.suiteID) ? parseInt($routeParams.suiteID) : 0;
		if (suiteID > 0) {
			$scope.suite = suitesService.getSuite(suiteID);
		}
	}
});