app.controller('MessageGunsController', function ($scope, messageGunsService) {
	$scope.messageGuns = [];
	
	init();
	
	function init() {
		$scope.messageGuns = messageGunsService.getMessageGuns();
	}

	$scope.insertMessageGuns = function () {
		var messageGunName = $scope.newMessageGun.messageGunName;
		var messageGunRabbitAddress = $scope.newMessageGun.messageGunRabbitAddress;
		var messageGunRabbitPort = $scope.newMessageGun.messageGunRabbitPort;
		var messageGunRabbitUsername = $scope.newMessageGun.messageGunRabbitUsername;
		var messageGunRabbitPassword = $scope.newMessageGun.messageGunRabbitPassword;
		var messageGunDataType = $scope.newMessageGun.messageGunDataType;
		var messageGunDataLocation = $scope.newMessageGun.messageGunDataLocation;
		var messageGunMessageReceiver = $scope.newMessageGun.messageGunMessageReceiver;
		var messageGunMessagesPerSecond = $scope.newMessageGun.messageGunMessagesPerSecond;
		var messageGunMaxMessages = $scope.newMessageGun.messageGunMaxMessages;
		var messageGunOptionalParams = $scope.newMessageGun.messageGunOptionalParams;

		messageGunsService.insertMessageGun(messageGunName, 
												messageGunRabbitAddress, 
												messageGunRabbitPort, 
												messageGunRabbitUsername,
												messageGunRabbitPassword,
												messageGunDataType,
												messageGunDataLocation,
												messageGunMessageReceiver,
												messageGunMessagesPerSecond,
												messageGunMaxMessages,
												messageGunOptionalParams)
		$scope.newMessageGun.messageGunName = '';
		$scope.newMessageGun.messageGunRabbitAddress = '';
		$scope.newMessageGun.messageGunRabbitPort = '';
		$scope.newMessageGun.messageGunRabbitUsername = '';
		$scope.newMessageGun.messageGunRabbitPassword = '';
		$scope.newMessageGun.messageGunDataType = '';
		$scope.newMessageGun.messageGunDataLocation = '';
		$scope.newMessageGun.messageGunMessageReceiver = '';
		$scope.newMessageGun.messageGunMessagesPerSecond = '';
		$scope.newMessageGun.messageGunMaxMessages = '';
		$scope.newMessageGun.messageGunOptionalParams = '';
	};

	$scope.deleteMessageGun = function (id) {
		messageGunsService.deleteMessageGun(id);
	}

});

app.controller('GunController', function ($scope, $routeParams, messageGunsService) {
	$scope.gun = {};
		
	init();
	
	function init() {
		var messageGunID = ($routeParams.messageGunID) ? parseInt($routeParams.messageGunID) : 0;
		if (messageGunID > 0) {
			$scope.gun = messageGunsService.getMessageGun(messageGunID);
		}
	}
});