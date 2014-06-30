app.controller('TestsController', function ($scope, suitesService) {
	$scope.suites = [];
	
	init();
	
	function init() {
		$scope.suites = suitesService.getSuites();
	}
});

app.controller('TestChildController', function ($scope) {
	$scope.orderby = 'TestID';
	$scope.reverse = false;
	$scope.totalTests = 0;
	
	init();
	
	function init() {
		if ($scope.suite && $scope.suite.tests) {
			$scope.totalTests = $scope.suite.tests.length;
		}
	}
	
	$scope.setOrder = function (orderby) {
		if (orderby === $scope.orderby) {
			$scope.reverse = !$scope.reverse;
		}
		$scope.orderby = orderby;
	};
});