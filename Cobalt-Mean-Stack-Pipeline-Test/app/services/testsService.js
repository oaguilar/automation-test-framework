app.service('testsService', function() {
	this.getTests = function () {
		return tests;
	};
	
	this.insertTests = function (testName, inputJson, expectedJson) {
		var topID = tests.length + 1;
		tests.push({
			testID:topID,
			testName: suiteName,
			inputJson: inputJson,
			expectedJson: expectedJson,
			returnedJson:''
		});
	};
	
	this.deleteTest = function (id) {
		for (var i = tests.length - 1; i >= 0; i--) {
			if (tests[i].testID === id) {
				tests.splice(i,1);
				break;
			}
		}
	};
	
	this.getTest = function (id) {
		for (var i = 0; i < tests.length; i++) {
			if (tests[i].testID === id) {
				return tests[i];
			}
		}
		return null;
	};
	
	var tests = [
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
					},
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
					},
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
	
});