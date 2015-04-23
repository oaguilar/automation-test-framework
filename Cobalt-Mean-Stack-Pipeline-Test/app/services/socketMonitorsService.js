app.service('socketMonitorsService', function() {
	this.getSocketMonitors = function () {
		return socketMonitors;
	};
	
	this.insertSocketMonitor = function (name, address, port, accountID, api_key, secure) {
		var topID = socketMonitors.length + 1;
		socketMonitors.push({
			socketMonitorID:topID,
			socketMonitorName:name,
			socketMonitorAddress: address,
			socketMonitorSecure: secure,
			socketMonitorPort: port,
			socketMonitorAccountID: accountID,
			socketMonitorApiKey: api_key
		});
	};
	
	this.deleteSocketMonitor = function (id) {
		for (var i = socketMonitors.length - 1; i >= 0; i--) {
			if (socketMonitors[i].socketMonitorID === id) {
				socketMonitors.splice(i,1);
				break;
			}
		}
	};
	
	this.getSocketMonitor = function (id) {
		for (var i = 0; i < socketMonitors.length; i++) {
			if (socketMonitors[i].socketMonitorID === id) {
				return socketMonitors[i];
			}
		}
		return null;
	};
	
	var socketMonitors = [
		{
			socketMonitorID:1,
			socketMonitorName: 'Staging',
			socketMonitorAddress:'10.200.0.82', 
			socketMonitorSecure: true,
			socketMonitorPort: '443', 
			socketMonitorAccountID:'1',
			socketMonitorApiKey: '1234567890ABCDEF1'
		},
		{
			socketMonitorID:2, 
			socketMonitorName: 'Staging2',
			socketMonitorAddress:'10.200.0.125', 
			socketMonitorSecure: true,
			socketMonitorPort: '443', 
			socketMonitorAccountID:'1',
			socketMonitorApiKey: '1234567890ABCDEF1'
		},
		{
			socketMonitorID:3, 
			socketMonitorName: 'QA1',
			socketMonitorAddress:'10.100.75.6', 
			socketMonitorSecure: false,
			socketMonitorPort: '8505', 
			socketMonitorAccountID:'1',
			socketMonitorApiKey: '1234567890ABCDEF1'
		},
		{
			socketMonitorID:4, 
			socketMonitorName: 'QA2',
			socketMonitorAddress:'10.100.75.19', 
			socketMonitorSecure: false,
			socketMonitorPort: '8505', 
			socketMonitorAccountID:'1',
			socketMonitorApiKey: '1234567890ABCDEF1'
		}
	];
	
});