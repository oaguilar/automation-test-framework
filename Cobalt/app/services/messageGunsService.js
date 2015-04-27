app.service('messageGunsService', function() {
	this.getMessageGuns = function () {
		return messageGuns;
	};
	
	this.insertMessageGun = function (name, rabbitHost, rabbitPort, rabbitUserName, rabbitPassword, dataType, dataLocation, messageReceiver, messagesPerSecond, maxMessages, optionalParams) {
		var topID = messageGuns.length + 1;
		messageGuns.push({
			messageGunID:topID,
			messageGunName:name,
			messageGunConfig: {
				rabbitHost: rabbitHost,
				rabbitPort: rabbitPort,
				rabbitUserName: rabbitUserName,
				rabbitPassword: rabbitPassword,
				dataType: dataType,
				dataLocation: dataLocation,
				messageReceiver: messageReceiver,
					senders: {
						messagesPerSecond: messagesPerSecond,
						maxMessages: maxMessages,
						optionalPipelineParameters: optionalParams
					}
			}
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
			messageGunName:'Local',
			messageGunConfig: {
				rabbitHost: 'localhost',
				rabbitPort: 5672,
				rabbitUserName: 'guest',
				rabbitPassword: 'guest',
				dataType: 'staticData',
				dataLocation: '/opt/MessageGun/textFiles/twitterSampleData20.json',
				messageReceiver: 'SocketServer',
					senders: {
						messagesPerSecond: 1,
						maxMessages: 20,
						optionalPipelineParameters: {

						}
					}
			}
		}
	];
});