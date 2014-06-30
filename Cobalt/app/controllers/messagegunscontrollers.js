app.controller('MessageGunsController', function ($scope, messageGunsService) {
	$scope.messageGuns = [];
	
	init();
	
	function init() {
		$scope.messageGuns = messageGunsService.getMessageGuns();
	}

	$scope.insertMessageGuns = function () {
		var messageGunName = $scope.newMessageGun.messageGunName;
		var messageGunAddress = $scope.newMessageGun.messageGunAddress;
		var messageGunSecure = $scope.newMessageGun.messageGunSecure;
		var messageGunPort = $scope.newMessageGun.messageGunPort;
		var messageGunAccountID = $scope.newMessageGun.messageGunAccountID;
		var messageGunApiKey = $scope.newMessageGun.messageGunApiKey;
		messageGunsService.insertMessageGun(messageGunName, 
												smessageGunAddress, 
												messageGunPort, 
												messageGunAccountID, 
												messageGunApiKey, 
												messageGunSecure)
		$scope.newMessageGun.messageGunName = '';
		$scope.newMessageGun.messageGunAddress = '';
		$scope.newMessageGun.messageGunPort = '';
		$scope.newMessageGun.messageGunAccountID = '';
		$scope.newMessageGun.messageGunApiKey = '';
	};

	$scope.deleteMessageGun = function (id) {
		messageGunsService.deleteMessageGun(id);
	}

});

app.controller('GunController', function ($scope, $routeParams, messageGunsService) {
	$scope.gun = {};
	$scope.wsUrl = '';
	
	init();
	
	function init() {
		var messageGunID = ($routeParams.messageGunID) ? parseInt($routeParams.messageGunID) : 0;
		if (messageGunID > 0) {
			$scope.gun = messageGunsService.getMessageGun(messageGunID);
		}
	}

	window.paused=true;
    function WS() {
      var _self = this;
      this.start = function() {
        var proto = '';
        if ($scope.gun.messageGunSecure) {
        	proto = 'wss';
        }
        else {
        	proto = 'ws';
        }
        var wsUrl = proto + "://" + 
        			$scope.gun.messageGunAddress + 
        			":" +
        			$scope.gun.messageGunPort +
        			"/account/" +
        			$scope.gun.messageGunAccountID +
        			"/feed?api_key=" +
        			$scope.gun.messageGunApiKey
        $scope.wsUrl = wsUrl;
        console.log(wsUrl);
        var ws = new WebSocket(wsUrl);								
        ws.onmessage = function(e) {
      		if(!window.paused) {	
            	var message = JSON.parse(e.data);
            $('#log').prepend('<pre>' + JSON.stringify(message, undefined, 2) + '</pre>');
      		}
        	//console.log(message);   
        };
      }
      _self.start();
    }

  	$scope.pause = function () {
  		console.log("Pause button clicked.")
  		window.paused=!window.paused;
  		$('#pauseBtn').val(window.paused?'Resume':'Pause');
  	}
    new WS();
});