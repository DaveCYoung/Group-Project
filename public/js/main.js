
angular.module("mainApp", [])

angular.module("mainApp")
	.controller('mainController', ['$scope', '$http', function($scope, $http){
		console.log("controller works.")
$scope.languageBefore = ''
$scope.languageAfter = ''
$scope.wordBefore = ''
$scope.wordAfter = ''	
$scope.error = false;

$scope.submit = function(){
	$http.post('/translatebefore', {
		languageBefore: $scope.languageBefore,
		languageAfter: $scope.languageAfter,
		wordBefore: $scope.wordBefore,
	})
	.then(function(returnData){
		console.log(returnData.data.translatedText)
		if (returnData.data.translatedText == $scope.wordBefore || !returnData.data.translatedText){
			$scope.error = true;
			console.log(returnData)
		}
		else{
		$scope.wordAfter = returnData.data.translatedText;
		$scope.error = false;
		}
	
	})
}


$scope.wordbank = "Canyon   boy girl arm leg cheese beer The cat dog boy girl arm leg cheese beer The cat dog boy girl arm leg cheese beer The cat dog boy girl arm leg cheese beer The cat dog boy girl arm leg cheese beer The cat dog boy girl arm leg cheese beer" 
$scope.wordArray = $scope.wordbank.split(' ')
$scope.quizAnswer = 'NOT MAPPING';

$scope.quizerror = false;
var wordcounter = Math.round($scope.wordArray.length*Math.random());
var errorcounter = 0;
$scope.currentword = $scope.wordArray[wordcounter]; 
$scope.correctAnswer ='';

$scope.wordCompare=function(correctAnswer, userAnswer){
	console.log('function is going.')
	if (correctAnswer.length === userAnswer.length){
		var errorcounter2 = 0;
		for(var i = 0;i<userAnswer.length; i++){
			if(correctAnswer[i] != userAnswer[i]){
				errorcounter2++
			}
		}
		if (errorcounter2 >1){
			$scope.ErrorEvent(correctAnswer, userAnswer)
		}
		else{$scope.almostCorrect(correctAnswer, userAnswer)}
	}

	else if (correctAnswer.length === (userAnswer.length+1)){
		console.log('answer is short')
		var errorcounter2 = 0;
		var indexoffset = 0;
		for (var i = 0; i<correctAnswer.length; i++){
			console.log("i = " + i + "    index offset = "+ indexoffset)
			if(correctAnswer[i] != userAnswer[i-indexoffset]){
				console.log("character 1: "+correctAnswer[i]+ ".   character 2: "+ userAnswer[i-indexoffset] )
				indexoffset++
				errorcounter2++
			}
			else{console.log("character 1: "+correctAnswer[i]+ ".   character 2: "+ userAnswer[i-indexoffset] )}
		}
		if(errorcounter2>1){
			$scope.ErrorEvent(correctAnswer, userAnswer)
		}
		else{$scope.almostCorrect(correctAnswer, userAnswer)}
	}

	else if (correctAnswer.length === (userAnswer.length-1)){
		console.log('answer is long')
		var errorcounter2 = 0;
		var indexoffset = 0;
		for (var i = 0; i<userAnswer.length; i++){
			console.log("i = " + i + "    index offset = "+ indexoffset)
			if(correctAnswer[i]!=userAnswer[i+indexoffset]){
				console.log("character 1: "+correctAnswer[i]+ ".   character 2: "+ userAnswer[i+indexoffset] )
				indexoffset++
				errorcounter2++
			}
			else{console.log("character 1: "+correctAnswer[i]+ ".   character 2: "+ userAnswer[i+indexoffset] )}
		}
		if(errorcounter2>1){
			$scope.ErrorEvent(correctAnswer, userAnswer)
		}
		else{$scope.almostCorrect(correctAnswer, userAnswer)}
	}
	else{$scope.ErrorEvent(correctAnswer, userAnswer)}
}

$scope.ErrorEvent = function(correctAnswer, userAnswer){
	$scope.quizResponse = userAnswer + " is incorrect.  The correct answer is "+ correctAnswer;
	console.log("User Answer: "+ userAnswer+".    Actual Answer: "+ correctAnswer+ "   Error....")
}
$scope.almostCorrect= function(correctAnswer, userAnswer){
	$scope.quizResponse = userAnswer +" is almost correct.  The correct answer is "+ correctAnswer
	console.log("User Answer: "+ userAnswer+".    Actual Answer: "+ correctAnswer+ "   Almost there....")
}
$scope.correctEvent = function(userAnswer){
	$scope.quizResponse = userAnswer + " is correct! ";
}
$scope.accentEvent = function(correctAnswer, userAnswer){
	$scope.quizResponse = userAnswer + " is almost correct.  The correct answer is "+ correctAnswer+".  Watch your accents!"
}

function RemoveAccents(strAccents) {
	var strAccents = strAccents.split('');
	var strAccentsOut = new Array();
	var strAccentsLen = strAccents.length;
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
		for (var y = 0; y < strAccentsLen; y++) {
			if (accents.indexOf(strAccents[y]) != -1) {
				strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
			} else
				strAccentsOut[y] = strAccents[y];
		}
		strAccentsOut = strAccentsOut.join('');
		console.log(strAccentsOut)
		return strAccentsOut;
	}





$scope.quizSubmit = function(){
	console.log('sending data')
	console.log($scope.quizAnswer)
	$http.post('/translatebefore', {
		languageBefore: 'en',
		languageAfter: $scope.languageSelection,
		wordBefore: $scope.currentword,
	})
	.then(function(returnData){
		console.log('data received')
		console.log(returnData)
	
		console.log(RemoveAccents("then " + $scope.quizAnswer.toLowerCase()+ " "+ returnData.data.translatedText.toLowerCase() ))
		if (returnData.data.translatedText.toLowerCase() == $scope.quizAnswer.toLowerCase()){
			wordcounter++;
			$scope.currentword = $scope.wordArray[wordcounter];
			$scope.correctEvent($scope.quizAnswer)
			console.log(RemoveAccents("if case is running " + $scope.quizAnswer.toLowerCase() + returnData.data.translatedText.toLowerCase() ))
		}
		else if ( $scope.quizAnswer.toLowerCase() == RemoveAccents(returnData.data.translatedText.toLowerCase()) ){
			console.log(RemoveAccents("else if case is running " + $scope.quizAnswer.toLowerCase() + returnData.data.translatedText.toLowerCase() ))
			$scope.accentEvent(returnData.data.translatedText, $scope.quizAnswer)
			wordcounter++
		}

		else{
			wordcounter++
			console.log(wordcounter)
			console.log("else case ran")
			w
			$scope.wordCompare(returnData.data.translatedText.toLowerCase(), $scope.quizAnswer.toLowerCase())
			}
			}
		)
}






	}])