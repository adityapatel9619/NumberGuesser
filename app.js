/*
GAME FUNCTION :
- Player must guess a number  between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining 
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInpt = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listner
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInpt.value);

    // Validate for input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }
    else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

            // guessInpt.disabled = true;
            // guessInpt.style.borderColor = 'red';
            // setMessage(`Game over, you lost. The correct number was ${winningNum}`, 'red');
        }
        else {
            // Border Color To Red
            guessInpt.style.borderColor = 'red';

            // Clear the input
            guessInpt.value = '';

            // Game continues - answer wrong    
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
        
    }
});

// Game Over

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInpt.disabled = true;

    // Change border color
    guessInpt.style.borderColor = color;

    // Change text color
    message.style.color = color;
    
    //Set Message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    //Appending class
    guessBtn.className += 'play-again';
}


// getWinningNum()

function getRandomNum(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)   
}



//Set message is in use only when game is continuing
// Set Message
function setMessage(msg,color) {
    message.style.color = color; //This line only works for game continuation
    message.textContent = msg;
}
