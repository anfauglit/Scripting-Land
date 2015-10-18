function getRandom(min, max) {
	return Math.round(Math.random()*(max - min) + Number(min));
}

function getEquation(sign) {
	//Based on the current state of test switches generates a function that is going 
	// to be used during the test for problems generation
	var checkBox = document.getElementById("checkBox");
	var rand = getRandom(data.minRandomNumber, data.maxRandomNumber);
	if (!checkBox.checked) {
		return function() {
		 return rand + " * " + getRandom(data.minRandomNumber, data.maxRandomNumber);
		};
	} else {
		if (sign === "/") {
			do {
				rand = getRandom(data.minRandomNumber, data.maxRandomNumber);
			} while (rand % data.selection != 0);
		}
		return function() {
			return rand + " " + sign + " " + data.selection;
		};
	}
}

var view = {
	displayEquation: function(text) {
		var equation = document.getElementById("randomEquation");
		equation.innerHTML = text;
	},
	displayResults: function(testResults) {
		for (var i = 0; i < data.equationNumber; i++) {
			var results = document.getElementById("result");
			results.innerHTML = results.innerHTML + testResults[i] + "<br>";
		}
	},
	displayStage: function(index, maxNumber) {
		var stageSpan = document.getElementById("current");
		stageSpan.innerHTML = index + "/" + maxNumber;
	}
}

var data = {
	minRandomNumber: 0,
	maxRandomNumber: 0,
	equationNumber: 10,
	currentEquation: 0,
	selection: 0,
	checkBox: true, // State of the check box for the special cases. The box is unchecked when the value is true
	userAnswers: [],
	checkAnswer: function() {
		var userAnswer = [];
		var equation = document.getElementById("randomEquation");
		userAnswer[0] = equation.innerHTML;
		var inputField = document.getElementById("answer");
		userAnswer[1] = inputField.value;
		var numbers = userAnswer[0].split(divOrMult());
		if (divOrMult() === "*") {
			rightAnswer = numbers[0] * numbers[1];
		} else {
			rightAnswer = numbers[0] / numbers[1];
		}
		if (rightAnswer == userAnswer[1]) {
			userAnswer[2] = true;
		} else {
			userAnswer[2] = false;
		}
		return userAnswer;
	}
}

function checkClick() {
		var genEquation = getEquation(divOrMult());
		data.userAnswers[data.currentEquation] = data.checkAnswer();
		data.currentEquation++;
		var inputField = document.getElementById("answer");
		inputField.value = "";
		if (data.currentEquation == data.equationNumber) {
			view.displayEquation("The test is over, check your answers");
			showResults(data.userAnswers);
			var startButton = document.getElementById("answerButton");
			startButton.setAttribute("value", "Start");
			startButton.focus();
			startButton.onclick = test;
			document.getElementById("current").innerHTML = "";
		} else {
			view.displayEquation(genEquation());
			view.displayStage(data.currentEquation + 1, data.equationNumber);	
		}
}
function divOrMult() {
	var div = document.getElementById("mult");
	if (div.checked) {
		data.selection = document.getElementById("multValue").value;
		return "*";
	} else {
		data.selection = document.getElementById("divValue").value;
		return "/";
	}
}


function test() {
	data.maxRandomNumber =  document.getElementById("maxRandNumber").value;
	data.minRandomNumber =  document.getElementById("minRandNumber").value;
	data.equationNumber = document.getElementById("numProblems").value;
	var genEquation = getEquation(divOrMult());
	data.currentEquation = 0;
	// var timerNode = document.getElementById("timer");
	// timerNode.innerHTML = 0;
	var table = document.getElementById("result");
	table.innerHTML = "";
	var startButton = document.getElementById("answerButton");
	view.displayEquation(genEquation());
	view.displayStage(data.currentEquation + 1, data.equationNumber);
	startButton.setAttribute("value", "Check");
	startButton.onclick = checkClick;
	var inputField = document.getElementById("answer");
	inputField.focus();
	inputField.onkeypress = handleKeyPress;
}
// function timer() {
	// var timerNode = document.getElementById("timer");
	// var timerCounter = 0;
	// var timerVariable = setInterval(tick, 1000);
	// function tick(timerVariable) { 
		// timerNode.innerHTML = 1 + Number(timerNode.innerHTML);
		// if (data.currenEquation === 3) {
			// clearInterval(timerVariable);
		// }
	// }
// }

function handleKeyPress(e) {
	var startButton = document.getElementById("answerButton");
	if (e.keyCode === 13) {
		startButton.click();
		return false;
	}
}

function activation() {
	//Changes the state of the radio buttons according to the state of CheckBox 
	var radios = document.getElementsByName("radio");
	for (var i = 0; i < radios.length; i++) {
		radios[i].disabled = data.checkBox;
	}
	data.checkBox = !data.checkBox;
}

function showResults(answers) {
	var table = document.getElementById("result");
	for (var i = 0; i < data.equationNumber; i++) {
			var newRow = document.createElement("tr");
			newRow.setAttribute("class","resultsRow");
			var tempArray = answers[i];
			for (var j = 0; j < 3; j++) {
				var newCell = document.createElement("td");
				newCell.setAttribute("class","cell");
				if (j == 2) {
					if (tempArray[j]) {
						newCell.innerHTML = "<img src='../images/ok.png'>";
					} else {
					  newCell.innerHTML = "<img src='../images/notok.png'>";
					} 
				} else {
					newCell.innerHTML = tempArray[j];
				}
				newRow.appendChild(newCell);
			}
			table.appendChild(newRow);
	}
}

window.onload = function() {
	var startButton = document.getElementById("answerButton");
	startButton.onclick = test;
	activation();
	var checkBox = document.getElementById("checkBox");
	checkBox.onchange = activation;
}
