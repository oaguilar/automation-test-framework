app.service('messageGunsService', function() {
	this.getMessageGuns = function () {
		return messageGuns;
	};
	
	this.insertMessageGun = function (name, address, port, accountID, api_key, secure) {
		var topID = messageGuns.length + 1;
		messageGuns.push({
			messageGunID:topID,
			messageGunName:name,
			messageGunAddress: address,
			messageGunecure: secure,
			messageGunPort: port,
			messageGunAccountID: accountID,
			messageGunApiKey: api_key
		});
	};
	
	this.deleteMessageGun = function (id) {
		for (var i = messageGuns.length - 1; i >= 0; i--) {
			if (messageGuns[i].messageGunID === id) {
				messageGuns.splice(i,1);
				break;
			}
		}
	};
	
	this.getMessageGun = function (id) {
		for (var i = 0; i < messageGuns.length; i++) {
			if (messageGuns[i].messageGunID === id) {
				return messageGuns[i];
			}
		}
		return null;
	};
	
	var messageGuns = [
		{
			messageGunID:1,
			messageGunName: 'Staging',
			messageGunAddress:'10.200.0.82', 
			messageGunecure: true,
			messageGunPort: '443', 
			messageGunAccountID:'1',
			messageGunApiKey: '1234567890ABCDEF1'
		},
		{
			messageGunID:2, 
			messageGunName: 'Staging2',
			messageGunAddress:'10.200.0.125', 
			messageGunecure: true,
			messageGunPort: '443', 
			messageGunAccountID:'1',
			messageGunApiKey: '1234567890ABCDEF1'
		},
		{
			messageGunID:3, 
			messageGunName: 'QA1',
			messageGunAddress:'10.100.75.6', 
			messageGunecure: false,
			messageGunPort: '8505', 
			messageGunAccountID:'1',
			messageGunApiKey: '1234567890ABCDEF1'
		},
		{
			messageGunID:4, 
			messageGunName: 'QA2',
			messageGunAddress:'10.100.75.19', 
			messageGunecure: false,
			messageGunPort: '8505', 
			messageGunAccountID:'1',
			messageGunApiKey: '1234567890ABCDEF1'
		}
	];
	
});