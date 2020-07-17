

const wordsToUse = ["elephant", "tiger", "cat", "dog", "giraffe", "owl", "snake", "kangaroo", "mouse", "raven", "bird", "cheetah", "raccoon"];
const userInput = document.getElementById('userInput');
const userInputValidate = document.getElementById('userInput');
const userstatus = document.getElementById('gameStatus');
const userTriesCounts = document.getElementById('userTriesCount');
const usedLetters = document.getElementById('userTriedLetters'); 
const userResetBtn = document.getElementById('resetGamebtn');

let chosenWord = ChoosingWordForPlay(wordsToUse); //the chosen word for the current game
const max_tries = 5;
let currentTries = 0;
let usedLettersArr = [];


userInput.addEventListener("change", GetUserLetter);
userInputValidate.addEventListener("keyup", validateUserKeyStroke)
userResetBtn.addEventListener("click", resetGame);




//Randomly picks one word from array for the play
function ChoosingWordForPlay(wordsToUse) {

    let myRandomnumber = wordsToUse.length;
    let chosenNumber = Math.floor(Math.random() * myRandomnumber) ;
    return wordsToUse[chosenNumber];


}


//Reseting the board for new game
function ResetBoard(chosenWord) {
    //reseting all the variables
    userInput.disabled = false;
    usedLetters.textContent =""; 
    userTriesCounts.textContent = "0";
    userstatus.textContent = "";
    currentTries = 0;
    usedLettersArr = [];
    let elementToUse = document.getElementById("words");
    elementToUse.innerHTML = '';
    

    for( i = 0; i < chosenWord.length; i++)
    {
        var div = document.createElement('div');
        div.className = "letter";
        div.id = i;
        div.textContent = "_";
        elementToUse.appendChild(div);
    }
    
}


//Here we check the guess of the player if it was right or wrong
function CheckTheGuess(userGuess) {


    
    var hitIndex = [];
    for(var i=0; i < chosenWord.length; i++) {
        if (chosenWord[i] === userGuess.toLowerCase()) hitIndex.push(i);
    }

    //Checking if we got any hits for the user guess
    if(hitIndex.length === 0) {

        usedLetters.textContent += userGuess +", ";
        usedLettersArr.push(userGuess);
        console.log(usedLettersArr);
        currentTries++;
        userTriesCounts.textContent = currentTries +" / "+max_tries;

        //if tries goes equal to max tries, the game is lost
        if( currentTries === max_tries) {

            userInput.disabled = true;
            userstatus.textContent = "You lost the game!";
        }
    }
    //If we get hits, we are going to reveal the position of the letter
    else {

        let allCreatedletters = document.getElementsByClassName("letter");
        let hasUserWon = true;

        for(i = 0; i < hitIndex.length; i++) {
            
            currentDiv = document.getElementById(hitIndex[i]);
            currentDiv.textContent = userGuess.toUpperCase();


        }


        for(i = 0; i < allCreatedletters.length; i++)
        {
            if(allCreatedletters[i].textContent === "_"){
                hasUserWon = false;
            }
        }
        
        if(hasUserWon === true)
        {
            userstatus.textContent = "You've won!";
            userInput.disabled = true;
        }
        
    }




}

//getting the user letter
function GetUserLetter() {

    let userInputTaken = userInput.value;
    let isAlreadyGuessed = false;
    userInput.value = "";
    
    for(i = 0; i < usedLettersArr.length ; i++) {
        usedLettersArr[i];
        
        if(userInputTaken.toLowerCase() === usedLettersArr[i]) {
            isAlreadyGuessed = true;
        }
    }



    if(userInputTaken.length === 1 && isAlreadyGuessed === false)
    {
        CheckTheGuess(userInputTaken);
    }
    
    
}
//With this we prevent the player to input multiple letters and preventing any numbers which player mind have tried
function validateUserKeyStroke() {
    userInputValidate.value = userInputValidate.value.replace(/\W|\d/g, '').substr(0, 1);
}

function resetGame() {
    chosenWord = ChoosingWordForPlay(wordsToUse);
    ResetBoard(chosenWord)
}

ResetBoard(chosenWord);



