// GLOBALS ----------------------------------------------

const CHOICE_LIST = ['computer-rock', 'computer-paper', 'computer-scissors'];
const NAME_LIST = ['Rock', 'Paper', 'Scissors'];
const PLAYER_LIST = ['player-rock', 'player-paper', 'player-scissors'];
let HUMAN_SCORE = 5;
let COMP_SCORE = 5;

// HELPER FUNCTIONS ----------------------------------------------
const capitalizeWord = function(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const decrementScore = function (loser)
{
    if (loser === 'COMP') {COMP_SCORE--}
    else if (loser === 'HUM') {HUMAN_SCORE--}
    else return;
}

// CHOICE FUNCTIONS ---------------------------------------------- 
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
    compDiv.classList.add('animation', 'computer');
    const textDiv = document.createElement('div');
    textDiv.textContent = `Computer chose ${computerChoiceObject.choice_string}.`;
    compDiv.appendChild(textDiv);
    main_container.appendChild(compDiv);
}

function makeChoice() {
    const choices = document.querySelectorAll('.interactiveImg');
    let hObj = {
        choice_name: undefined,
        choice_class: undefined
    };
    showScores(HUMAN_SCORE,COMP_SCORE);
    choices.forEach(btn => btn.addEventListener('click', 
    e =>  {
        hObj.choice_name = e.target.classList[0],
        hObj.choice_class = PLAYER_LIST[e.target.classList[1]]
        
        runGame(hObj);

        if ((HUMAN_SCORE === 0) || (COMP_SCORE === 0))
        {
            console.log('it works!');
            //endGame();
        }
    }));
};

// GAME LOGIC ----------------------------------------------
const winConditions = function(human, computer)
{
    let winObj = {};

    if (human === computer.choice_string) 
    {
        winObj.winner = `Draw!`;
        visualizeComputerChoice(computer);
        return winObj;
    }

    switch (human) {
        case "Rock":
            if (computer.choice_string === "Scissors") 
            {
                winObj.winner = `You win!`;
                winObj.loser = 'COMP'
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Paper") 
            {
                winObj.winner = 'You lost!';
                winObj.loser = 'HUM'
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        case "Paper":
            if (computer.choice_string === "Rock") 
            {
                winObj.winner = `You win!`
                winObj.loser = 'COMP'
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Scissors") 
            {
                winObj.winner = `You lost!`;
                winObj.loser = 'HUM'
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        case "Scissors":
            if (computer.choice_string === "Paper") 
            {
                winObj.winner = `You win!`
                winObj.loser = 'COMP'
                visualizeComputerChoice(computer);
                return winObj;
            }
            if (computer.choice_string === "Rock") {
                winObj.winner = `You lost!`
                winObj.loser = 'HUM'
                visualizeComputerChoice(computer);
                return winObj;
            }
            break;
        default:
            console.log("issue in winConditions");
    }
}


// STARTSCREEN FUNCTIONS ----------------------------------------------

function removeStartScreen_YES() {
    const startscreen = document.querySelector('.startscreen');
    const noOtherWayAround = () => startscreen.style.display = 'none';
    setTimeout(noOtherWayAround,500);
}

function removeStartScreen_NO() {
    const startscreen = document.querySelector('.startscreen');

    const delete_Buttons = () =>
        startscreen.textContent = "OK, bye then :(";

    setTimeout(delete_Buttons, 500);
}

const yes_button = document.querySelector('.yes');
yes_button.addEventListener('focus', removeStartScreen_YES);

const no_button = document.querySelector('.no');
no_button.addEventListener('focus', removeStartScreen_NO);


// GAME FUNCTIONS ----------------------------------------------

const showScores = function(human, computer) {
    let playerScore = document.getElementById('pScore');
    let computerScore = document.getElementById('cScore');

    playerScore.textContent = `Player lives: ${human}`;
    computerScore.textContent = `Computer lives: ${computer}`;
}

function announceRoundWinner(player, winObj) {
    const main_container = document.querySelector('.main-container');
    const annDiv = document.createElement('div');
    annDiv.classList.add('animation','player');
    annDiv.classList.add(`${player.choice_class}`);
    const textDiv = document.createElement('div');
    textDiv.textContent = `${winObj.winner}!`;
    annDiv.appendChild(textDiv);
    main_container.appendChild(annDiv);
}

const resetAnimations = () => {
    const animDivs = document.getElementsByClassName("animation");
    const l = animDivs.length;
    for (let i = 0; i < l; i++)
    {
        animDivs[i].remove();
        animDivs[i].remove();
    }
}

const runGame =  (human) => 
{   
    
    const computerChoiceObject = computerChoice();
    showScores(HUMAN_SCORE, COMP_SCORE);
    const winObj = winConditions(human.choice_name, computerChoiceObject);
    announceRoundWinner(human, winObj);
    decrementScore(winObj.loser);
    showScores(HUMAN_SCORE, COMP_SCORE);
    setTimeout(resetAnimations, 1000);

    if (HUMAN_SCORE === 0 || COMP_SCORE === 0)
    {
        setTimeout(endGame(HUMAN_SCORE, COMP_SCORE), 500);
    }
}

// END GAME ----------------------------------------------
function endGame(h,c)
{
    const you = "You";
    const comp = "Computer";
    const endGameDiv = document.createElement('div');
    const body = document.querySelector('body');
    const main_container = document.querySelector('.main-container');
    endGameDiv.classList.add('end-screen');
    endGameDiv.setAttribute('style', 'white-space: pre');
    endGameDiv.textContent = `The game is over!\r\n${h>c?you:comp} won with ${h>c?h:c} point(s) left!\r\nIf you wish to play again, refresh the page :)`;
    main_container.style.display = 'none';
    body.appendChild(endGameDiv);
}




makeChoice();
