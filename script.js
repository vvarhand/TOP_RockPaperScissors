const CHOICE_LIST = ['computer-rock', 'computer-paper', 'computer-scissors'];
const NAME_LIST = ['Rock', 'Paper', 'Scissors'];
const PLAYER_LIST = ['player-rock', 'player-paper', 'player-scissors'];
//let GAME_COUNT = 0;
let HUMAN_SCORE = 5;
let COMP_SCORE = 5;
//let HUMAN_CHOICE = "";

// Helper functions 
const capitalizeWord = function(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Choice functions 
function computerChoice() { 
    let random = (Math.floor(Math.random() * 10)) % 3; 
    let cObj = {
        choice: CHOICE_LIST[random],
        choice_string: NAME_LIST[random]
    }; 
    
    return cObj;
    };

function visualizeComputerChoice(computerChoiceObject)
{
    const main_container = document.querySelector('.main-container');
    const compDiv = document.createElement('div');
    compDiv.classList.add(computerChoiceObject.choice);
    compDiv.classList.add('computer');
    compDiv.textContent = `Computer chose ${computerChoiceObject.choice_string}.`
    main_container.appendChild(compDiv);
}

function makeChoice() {
    const choices = document.querySelectorAll('.interactiveImg');
    let hObj = {
        choice_name: undefined,
        choice_class: undefined
    };

    choices.forEach(btn => btn.addEventListener('click', 
    e =>  {
        e.target.classList.add('perma-border');
        hObj.choice_name = e.target.classList[0],
        hObj.choice_class = PLAYER_LIST[e.target.classList[1]]
        runGame(hObj);
    }));
};

const decrementScore = (player) => {player--};

// Game Logic 
const winConditions = function(human, computer)
{
    let winObj = {};

    if (human === computer.choice_string) 
    {
        winObj.winner = `Draw! You and computer both chose ${human}`;
        visualizeComputerChoice(computer);
        return winObj;
    }

    switch (human) {
        case "Rock":
            if (computer.choice_string === "Scissors") 
            {
                decrementScore(COMP_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer.choice_string}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Paper") 
            {
                decrementScore(HUMAN_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You lost! ${computer.choice_string} beats ${human}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        case "Paper":
            if (computer.choice_string === "Rock") 
            {
                decrementScore(COMP_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer.choice_string}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Scissors") 
            {
                decrementScore(HUMAN_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You lost! ${computer.choice_string} beats ${human}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        case "Scissors":
            if (computer.choice_string === "Paper") 
            {
                decrementScore(COMP_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer.choice_string}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Rock") {
                decrementScore(HUMAN_SCORE);
                showScores(HUMAN_SCORE, COMP_SCORE);
                winObj.winner = `You lost! ${computer.choice_string} beats ${human}`;
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        default:
            console.log("issue in winConditions");
    }
}

function removeStartScreen_YES() {
    const startscreen = document.querySelector('.startscreen');
    const noOtherWayAround = () => startscreen.style.display = 'none';
    setTimeout(noOtherWayAround,500);
}

function removeStartScreen_NO() {
    const startscreen = document.querySelector('.startscreen');

    const delete_Buttons = function() {
        startscreen.textContent = "OK, bye then :(";
    };

    setTimeout(delete_Buttons, 500);
}

const yes_button = document.querySelector('.yes');
yes_button.addEventListener('focus', removeStartScreen_YES);

const no_button = document.querySelector('.no');
no_button.addEventListener('focus', removeStartScreen_NO);


const showScores = function(human, computer) {
    let playerScore = document.getElementById('pScore');
    let computerScore = document.getElementById('cScore');

    playerScore.textContent = `Player lives: ${human}`;
    computerScore.textContent = `Computer lives: ${computer}`;
}

showScores(HUMAN_SCORE, COMP_SCORE);

function announceRoundWinner(player, winObj) {
    const main_container = document.querySelector('.main-container');
    const annDiv = document.createElement('div');
    annDiv.classList.add('player');
    annDiv.classList.add(`${player.choice_class}`);
    annDiv.textContent = `${winObj.winner}!`;
    main_container.appendChild(annDiv);
}

const runGame =  (human) => 
{   
    const computerChoiceObject = computerChoice();

    const winObj = winConditions(human.choice_name, computerChoiceObject);
    announceRoundWinner(human, winObj);

    //function resetAnimations()
    //function endGame()
}

makeChoice();

/* Deprecated functions 

const checkChoiceCorrectness = function(human) {
    return CHOICE_LIST.includes(human);
}

const humanChoice = function() {
    let human = prompt("Please choose Rock, Paper or Scissors: ");
    return human.toLowerCase();
}

const declareWinner = function(player, computer) {
    let winner = (player > computer) ? "You" : "Computer";
    return `${winner} won!`
}

*/