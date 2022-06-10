/*
    Requirements:
        - Player (prompt)
        - Computer (random response to Player prompt)
        - Game Logic (game loop & win conditions)
*/

const CHOICE_LIST = ['Rock', 'Paper', 'Scissors'];
let GAME_COUNT = 0;
let HUMAN_SCORE = 0;
let COMP_SCORE = 0;

// Helper functions 
const checkChoiceCorrectness = function(human) {
        return CHOICE_LIST.includes(human);
}

const capitalizeWord = function(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Choice functions 
const humanChoice = function() {
    let human = prompt("Please choose Rock, Paper or Scissors: ");
    return human.toLowerCase();
}

const computerChoice = () => CHOICE_LIST[(Math.floor(Math.random() * 10)) % 3];




// Game Logic 
const winConditions = function(human, computer)
{
    if (human === computer) 
    {
        GAME_COUNT++;
        return `Draw! You and computer both chose ${human}`;
    }

    switch (human) {
        case "Rock":
            if (computer === "Scissors") 
            {
                incrementScore(HUMAN_SCORE);
                GAME_COUNT++;
                return `You win! ${human} beats ${computer}`;
            }
            if (computer === "Paper") 
            {
                incrementScore(COMP_SCORE);
                GAME_COUNT++;
                return `You lost! ${computer} beats ${human}`;
            }
            break;
        case "Paper":
            if (computer === "Rock") 
            {
                incrementScore(HUMAN_SCORE);
                GAME_COUNT++;
                return `You win! ${human} beats ${computer}`;
            }
            if (computer === "Scissors") 
            {
                incrementScore(COMP_SCORE);
                GAME_COUNT++;
                return `You lost! ${computer} beats ${human}`;
            }
            break;
        case "Scissors":
            if (computer === "Paper") 
            {
                incrementScore(HUMAN_SCORE);
                GAME_COUNT++;
                return `You win! ${human} beats ${computer}`;
            }
            if (computer === "Rock") {
                incrementScore(COMP_SCORE);
                GAME_COUNT++;
                return `You lost! ${computer} beats ${human}`;
            }
            break;
        default:
            console.log("why?");
    }
}

const incrementScore = (player) => {player++};

const runGame = function() 
{
    let human = capitalizeWord(humanChoice());
    let computer = computerChoice();    

    if (human === "Q") {
        console.log("Goodbye!");
        return;
    }

    if (checkChoiceCorrectness(human))
    {
        console.log(winConditions(human, computer));
    }
    else {
        console.log("Please type in 'Rock', 'Paper' or 'Scissors'!\nEnter 'q' if you want to stop :)");
        runGame();
    }
}

const declareWinner = function(player, computer) {
    let winner = (player > computer) ? "You" : "Computer";
    return `${winner} won!`
}


//while (GAME_COUNT < 5)
//{
    //runGame();
//}

//if (GAME_COUNT == 5)
//{
    //console.log(declareWinner());
//}