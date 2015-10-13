function genEquation(maxNumber) {
	var checkBox = document.getElementById("checkBox");
	if (!checkBox.checked) {
		return Math.round(Math.random() * maxNumber) + " * " + Math.round(Math.random() * maxNumber);
	} else {
		var radio1 = document.getElementById("Mult2");
		var radio2 = document.getElementById("Mult5");
		var radio3 = document.getElementById("Mult25");
		if (radio1.checked) {
			return Math.round(Math.random() * maxNumber) + " * 2";
		}
		if (radio2.checked) {
			return Math.round(Math.random() * maxNumber) + " * 5";
		}
		if (radio3.checked) {
			return Math.round(Math.random() * maxNumber) + " * 25";
		}
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
	maxRandomNumber: 100,
	equationNumber: 10,
	currentEquation: 0,
	userAnswers: [],
	checkAnswer: function() {
		var userAnswer = [];
		var equation = document.getElementById("randomEquation");
		userAnswer[0] = equation.innerHTML;
		var inputField = document.getElementById("answer");
		userAnswer[1] = inputField.value;
		var numbers = userAnswer[0].split("*");
		rightAnswer = numbers[0] * numbers[1];
		if (rightAnswer == userAnswer[1]) {
			userAnswer[2] = true;
		} else {
			userAnswer[2] = false;
		}
		return userAnswer;
	}
}

function checkClick() {
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
			view.displayEquation(genEquation(data.maxRandomNumber));
			view.displayStage(data.currentEquation + 1, data.equationNumber);	
		}
}

function test() {
	data.currentEquation = 0;
	var table = document.getElementById("result");
	table.innerHTML = "";
	var startButton = document.getElementById("answerButton");
	var maxRand = document.getElementById("maxRandNumber");
	var numProb = document.getElementById("numProblems");
	data.maxRandomNumber = maxRand.value;
	data.equationNumber = numProb.value;
	view.displayEquation(genEquation(data.maxRandomNumber));
	view.displayStage(data.currentEquation + 1, data.equationNumber);
	startButton.setAttribute("value", "Check");
	startButton.onclick = checkClick;
	var inputField = document.getElementById("answer");
	inputField.focus();
	inputField.onkeypress = handleKeyPress;
}

function handleKeyPress(e) {
	var startButton = document.getElementById("answerButton");
	if (e.keyCode === 13) {
		startButton.click();
		return false;
	}
}

function init() {
	var startButton = document.getElementById("answerButton");
	startButton.onclick = test;
	activation();
	var checkBox = document.getElementById("checkBox");
	checkBox.onchange = activation;
}

function activation() {
	var checkBox = document.getElementById("checkBox");
	var maxRand = document.getElementById("maxRandNumber");
	var radio1 = document.getElementById("Mult2");
	var radio2 = document.getElementById("Mult5");
	var radio3 = document.getElementById("Mult25");
	if (checkBox.checked) {
		maxRand.disabled = true;
		radio1.disabled = false;
		radio2.disabled = false;
		radio3.disabled = false;
	} else {
		maxRand.disabled = false;
		radio1.disabled = true;
		radio2.disabled = true;
		radio3.disabled = true;
	}
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

window.onload = init;
