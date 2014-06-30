app.service('suitesService', function() {
	this.getSuites = function () {
		return suites;
	};
	
	this.insertSuite = function (suiteName, suiteShortDesc, suiteDesc) {
		var topID = suites.length + 1;
		suites.push({
			suiteID:topID,
			suiteName: suiteName,
			suiteShortDesc: suiteShortDesc,
			suiteDesc: suiteDesc
		});
	};
	
	this.deleteSuite = function (id) {
		for (var i = suites.length - 1; i >= 0; i--) {
			if (suites[i].suiteID === id) {
				suites.splice(i,1);
				break;
			}
		}
	};
	
	this.getSuite = function (id) {
		for (var i = 0; i < suites.length; i++) {
			if (suites[i].suiteID === id) {
				return suites[i];
			}
		}
		return null;
	};
	
	var suites = [
		{
			suiteID:1, suiteName:'ASAS Worker', suiteShortDesc: 'First Filler suite', suiteDesc:'This is a testSuite to test the ASAS worker',
			tests: [
					{  	
						testID:1,
						testName: "First test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:2, 
						testName: "second test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:3, 
						testName: "third test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					}
			]
		},
		{
			suiteID:2, suiteName:'Sentiment Worker', suiteShortDesc: 'Second Filler suite', suiteDesc:'This is a testSuite to test the sentiment worker',
			tests: [
					{  	
						testID:4, 
						testName: "First test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:5, 
						testName: "second test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:6,
						testName: "third test",						
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					}
			]
		},
		{
			suiteID:3, suiteName:'Topic Matcher', suiteShortDesc: 'ThirdFiller', suiteDesc:'This is a testSuite to test the Klout metric',
			tests: [
					{  	
						testID:7, 
						testName: "First test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:8, 
						testName: "second test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					},
					{  	
						testID:9, 
						testName: "third test",
						inputJson: {},
						expectedJson:{},
						returnedJson:{}
					}
			]
		}
	];
	
});