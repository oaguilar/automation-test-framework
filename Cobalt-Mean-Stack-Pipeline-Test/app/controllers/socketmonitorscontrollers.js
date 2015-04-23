app.controller('MonitorController', function ($scope, $routeParams, socketMonitorsService) {
	$scope.monitor = {};
	$scope.wsUrl = '';
	
	init();
	
	function init() {
		var socketMonitorID = ($routeParams.socketMonitorID) ? parseInt($routeParams.socketMonitorID) : 0;
		if (socketMonitorID > 0) {
			$scope.monitor = socketMonitorsService.getSocketMonitor(socketMonitorID);
		}
	}

	window.paused=true;
    function WS() {
      var _self = this;
      this.start = function() {
        var proto = '';
        if ($scope.monitor.socketMonitorSecure) {
        	proto = 'wss';
        }
        else {
        	proto = 'ws';
        }
        var wsUrl = proto + "://" + 
        			$scope.monitor.socketMonitorAddress + 
        			":" +
        			$scope.monitor.socketMonitorPort +
        			"/account/" +
        			$scope.monitor.socketMonitorAccountID +
        			"/feed?api_key=" +
        			$scope.monitor.socketMonitorApiKey
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


app.controller('SocketMonitorsController', function ($scope, socketMonitorsService) {
  $scope.socketMonitors = [];
  
  init();
  
  function init() {
    $scope.socketMonitors = socketMonitorsService.getSocketMonitors();
  }

  $scope.insertSocketMonitor = function () {
    var socketMonitorName = $scope.newSocketMonitor.socketMonitorName;
    var socketMonitorAddress = $scope.newSocketMonitor.socketMonitorAddress;
    var socketMonitorSecure = $scope.newSocketMonitor.socketMonitorSecure;
    var socketMonitorPort = $scope.newSocketMonitor.socketMonitorPort;
    var socketMonitorAccountID = $scope.newSocketMonitor.socketMonitorAccountID;
    var socketMonitorApiKey = $scope.newSocketMonitor.socketMonitorApiKey;
    socketMonitorsService.insertSocketMonitor(socketMonitorName, 
                        socketMonitorAddress, 
                        socketMonitorPort, 
                        socketMonitorAccountID, 
                        socketMonitorApiKey, 
                        socketMonitorSecure)
    $scope.newSocketMonitor.socketMonitorName = '';
    $scope.newSocketMonitor.socketMonitorAddress = '';
    $scope.newSocketMonitor.socketMonitorPort = '';
    $scope.newSocketMonitor.socketMonitorAccountID = '';
    $scope.newSocketMonitor.socketMonitorApiKey = '';
  };

  $scope.deleteSocketMonitor = function (id) {
    socketMonitorsService.deleteSocketMonitor(id);
  }

});