document.getElementById('start-game').addEventListener('click', function() {
    const playerName = document.getElementById('player1-name').value;
    if (playerName.trim() === "") {
        alert("Please enter a name.");
        return;
    }

    // Set the player name on the game screen
    document.querySelector('.player-name').textContent = `Player: ${playerName}`;
    document.querySelector('.game-container').classList.add('visible');
    document.querySelector('.selection-container').style.display = 'none';

    // Change background color
    document.body.style.transition = "background-color 0.5s ease";  // Add transition effect
    document.body.style.backgroundColor = "#2d3b39";  // New color
});

const choices = ['rock', 'paper', 'scissor'];

document.querySelectorAll('.rock, .paper, .scissor').forEach(button => {
    button.addEventListener('click', function() {
        const playerChoice = this.className;
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        // Update the result
        let result = determineWinner(playerChoice, computerChoice);
        updateScore(result);
        document.querySelector('.result').textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    });
});

document.querySelector('.reload').addEventListener('click', function() {
    document.querySelector('.p-count').textContent = 'Player: 0';
    document.querySelector('.c-count').textContent = 'Computer: 0';
    document.querySelector('.movesleft').textContent = 'Moves Left: 5';
    document.querySelector('.result').textContent = 'Choose your move';
    document.querySelector('.winner').textContent = '';
    document.querySelector('.reload').style.display = 'none';
});

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissor' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function updateScore(result) {
    let playerScore = parseInt(document.querySelector('.p-count').textContent.split(': ')[1]);
    let computerScore = parseInt(document.querySelector('.c-count').textContent.split(': ')[1]);

    if (result === 'You win!') {
        playerScore++;
    } else if (result === 'Computer wins!') {
        computerScore++;
    }

    document.querySelector('.p-count').textContent = `Player: ${playerScore}`;
    document.querySelector('.c-count').textContent = `Computer: ${computerScore}`;

    // Check for a winner after 5 moves
    let movesLeft = parseInt(document.querySelector('.movesleft').textContent.split(': ')[1]);
    movesLeft--;

    if (movesLeft <= 0) {
        document.querySelector('.winner').textContent = getFinalWinner(playerScore, computerScore);
        document.querySelector('.reload').style.display = 'inline-block';
    } else {
        document.querySelector('.movesleft').textContent = `Moves Left: ${movesLeft}`;
    }
}

function getFinalWinner(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return "You are the winner!";
    } else if (computerScore > playerScore) {
        return "Computer is the winner!";
    } else {
        return "It's a tie!";
    }
}
