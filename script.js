/*
    Requirements:
        - Player (prompt)
        - Computer (random response to Player prompt)
        - Game Logic (game loop & win conditions)
*/

const CHOICE_LIST = ['Rock', 'Paper', 'Scissors'];

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
    return human;
}

const computerChoice = () => CHOICE_LIST[(Math.floor(Math.random() * 10)) % 3];
 
// Game Logic 
const winConditions = function(human, computer)
{
    if (human === computer) {return `Draw! You can computer both chose ${human}`;}

    switch (human) {
        case "Rock":
            if (computer === "Scissors") {return `You win! ${human} beats ${computer}`}
            if (computer === "Paper") {return `You lost! ${computer} beats ${human}`}
            break;
        case "Paper":
            if (computer === "Rock") {return `You win! ${human} beats ${computer}`}
            if (computer === "Scissors") {return `You lost! ${computer} beats ${human}`}
            break;
        case "Scissors":
            if (computer === "Paper") {return `You win! ${human} beats ${computer}`}
            if (computer === "Rock") {return `You lost! ${computer} beats ${human}`}
            break;
        default:
            console.log("why?");
    }
}

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

runGame();