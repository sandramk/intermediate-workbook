'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var prompt = require('prompt');
prompt.start();

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
    for (var i = 0; i < board.length; i++) {
        console.log(board[i]);
    }
}

function generateSolution() {
    for (var i = 0; i < 4; i++) {
        var randomIndex = getRandomInt(0, letters.length);
        solution += letters[randomIndex];
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
    var solutionArray = solution.split('');
    var guessArray = guess.split('');
    var correctLetterLocations = 0;
    for (var i=0; i < 4; i++) {
      if (solutionArray[i] === guessArray[i]) {
        correctLetterLocations ++ ;
        solutionArray[i] = null;
      }
    };
    var correctLetters = 0;
    for (var i=0; i < 4; i++) {
	     var targetIndex = solutionArray.indexOf(guessArray[i])
//detect if the letter in guessArray matches a letter in solutionArray.  If it does,
//add to correctLetters and set the index to null.
	   if (targetIndex > -1) {
		    correctLetters ++ ;
		    targetIndex = null;
	    }
    }
    return colors.red(correctLetterLocations) + '-' + colors.white(correctLetters);
}

function mastermind(guess) {
    if (solution === guess){
//not console.log the string?
      return "You guessed it!";
    }
    var hint = generateHint(solution, guess);
    board.push(guess + hint);
    if (board.length === 10) {
      return "You ran out of turns! The solution was " + solution;
    }
}



function getPrompt() {
    prompt.get(['guess'], function (error, result) {
        console.log( mastermind(result['guess']) );
        printBoard();
        getPrompt();
    });
}

// Tests

if (typeof describe !== 'undefined') {

    describe('#mastermind()', function () {
        it('should register a guess and generate hints', function () {
            solution = 'abcd';
            mastermind('aabb');
            assert.equal(board.length, 1);
        });
        it('should be able to detect a win', function () {
            assert.equal(mastermind(solution), 'You guessed it!');
        });
    });

    describe('#generateHint()', function () {
        it('should generate hints', function () {
            assert.equal(generateHint('abcd', 'abdc'), colors.red('2') + '-' + colors.white('2'));
        });
        it('should generate hints if solution has duplicates', function () {
            assert.equal(generateHint('abcd', 'aabb'), colors.red('1') + '-' + colors.white('1'));
        });

    });

} else {

    generateSolution();
    getPrompt();
}
