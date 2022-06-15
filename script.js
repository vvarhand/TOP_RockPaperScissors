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

function visualizeComputerChoice()
{
    let comch = computerChoice();
    const main_container = document.querySelector('.main-container');
    const compDiv = document.createElement('div');
    compDiv.classList.add(comch.choice);
    compDiv.classList.add('computer');
    compDiv.textContent = `Computer chose ${comch.choice_string}.`
    main_container.appendChild(compDiv);
    return comch;
}

async function makeChoice() {
    const choices = document.querySelectorAll('.interactiveImg');
    let hObj = {
        choice_name: undefined,
        choice_class: undefined
    };

    choices.forEach(btn => btn.addEventListener('click', 
    e => {
        e.target.classList.add('perma-border')
        hObj.choice_name = e.target.classList[0],
        hObj.choice_class = PLAYER_LIST[e.target.classList[1]]
    }));
    
    return hObj;
};

// Game Logic 
const winConditions = function(human, computer)
{
    let winObj = {};

    if (human === computer) 
    {
        winObj.winner = `Draw! You and computer both chose ${human}`;
        return winObj;
    }

    switch (human) {
        case "Rock":
            if (computer === "Scissors") 
            {
                decrementScore(COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer}`;
                return winObj;
            }
            if (computer === "Paper") 
            {
                decrementScore(HUMAN_SCORE);
                winObj.winner = `You lost! ${computer} beats ${human}`;
                return winObj;
            }
            break;
        case "Paper":
            if (computer === "Rock") 
            {
                decrementScore(COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer}`;
                return winObj;
            }
            if (computer === "Scissors") 
            {
                decrementScore(HUMAN_SCORE);
                winObj.winner = `You lost! ${computer} beats ${human}`;
                return winObj;
            }
            break;
        case "Scissors":
            if (computer === "Paper") 
            {
                decrementScore(COMP_SCORE);
                winObj.winner = `You win! ${human} beats ${computer}`;
                return winObj;
            }
            if (computer === "Rock") {
                decrementScore(HUMAN_SCORE);
                winObj.winner = `You lost! ${computer} beats ${human}`;
                return winObj;
            }
            break;
        default:
            console.log("something went wrong?!");
    }
}


const decrementScore = (player) => {player--};

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

const runGame =  async () => 
{   
    const hObj = await makeChoice();
    const cObj = visualizeComputerChoice();

    //let winObj = winConditions(hObj.choice_name, cObj.choice_string);
    //announceRoundWinner(hObj, winObj);
}

runGame();


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