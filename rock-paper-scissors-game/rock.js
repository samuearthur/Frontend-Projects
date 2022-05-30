// RULES MODAL
let rBtn = document.querySelector('.rules-btn');
let rModal = document.querySelector('.modal');
let rClose = document.querySelector('.close-icon');
rBtn.addEventListener('click', () => {
    rModal.classList.toggle('show');
})
rClose.addEventListener('click', () => {
    rModal.setAttribute('class', 'modal');
})

// REGISTER FORM
let form = document.querySelector('#form');
let nInput = document.querySelector('#name-input');
let register = document.querySelector('#start-btn');
let verify = '';
register.addEventListener('click', () => {
    if (nInput.value !== '') {
        var name = nInput.value;
    } else {
        var name = prompt("Type in your name, please");
    }
    form.textContent = `Welcome, ${name}.
                        You're up against Elkanah.
                        See if you can beat him in 15 rounds.`
    verify = true;
})

// GAME PLAY
let gameArea = document.querySelector('.game-area');
let faceOff = document.querySelector('.face-off');
let userArea = document.querySelector('.user-pick');
let systemArea = document.querySelector('.system-pick');
let userValue = document.querySelector('#userScore');
let systemValue = document.querySelector('#systemScore');
let round = document.querySelector('#round');
let up = document.querySelector('#up');
let sp = document.querySelector('#sp');
var Rock = document.querySelector(".rock-icon");
var Paper = document.querySelector(".paper-icon");
var Scissors = document.querySelector(".scissors-icon");
var options = ["Rock", "Paper", "Scissors"];
var userScore = 0;
var systemScore = 0;
var gameCount = 0;

function renderGame() {
    if (verify != true) {
        //alert('You need to register first'); 
        throw new Error()
    }

    var choice = this.event.target.getAttribute('name');
    var systemPick = Math.floor(Math.random() * 3);
    gameCount += 1;
    round.textContent = `Round ${gameCount}`;

    var uRock = Rock.cloneNode(true);
    var uPaper = Paper.cloneNode(true);
    var uScissors = Scissors.cloneNode(true);
    var sRock = Rock.cloneNode(true);
    var sPaper = Paper.cloneNode(true);
    var sScissors = Scissors.cloneNode(true);

    // New Icons should not trigger render() function
    uRock.setAttribute('onclick', '');
    uPaper.setAttribute('onclick', '');
    uScissors.setAttribute('onclick', '');
    sRock.setAttribute('onclick', '');
    sPaper.setAttribute('onclick', '');
    sScissors.setAttribute('onclick', '');

    var choiceIcon = "";
    var systemIcon = "";
    form.innerHTML = '';
    faceOff.setAttribute('class', 'face-off show');


    if (choice == "Rock") { choiceIcon = uRock };
    if (choice == "Paper") { choiceIcon = uPaper };
    if (choice == "Scissors") { choiceIcon = uScissors };
    if (options[systemPick] == "Rock") { systemIcon = sRock };
    if (options[systemPick] == "Paper") { systemIcon = sPaper };
    if (options[systemPick] == "Scissors") { systemIcon = sScissors };

    // ENSURE TO STYLE THE CLONE ELEMENTS 
    // they have position:absolute; and may fly all over the place.
    choiceIcon.setAttribute('id', 'uCreatedIcon');
    systemIcon.setAttribute('id', 'sCreatedIcon');

    // DISPLAY THE NAME OF GAME PLAYED
    var uChoiceTxt = document.createElement("p");
    var sChoiceTxt = document.createElement("p");
    uChoiceTxt.textContent = `You played ${choice}`;
    sChoiceTxt.textContent = `Mofe played ${options[systemPick]}`;
    if (up.hasChildNodes()) {
        up.replaceChildren(uChoiceTxt) //Replace appended paragraphs from previous game rounds
    } else up.appendChild(uChoiceTxt); //for first round
    if (sp.hasChildNodes()) {
        sp.replaceChildren(sChoiceTxt) //Replace appended paragraphs from previous game rounds
    } else sp.appendChild(sChoiceTxt); //for first round

    // DISPLAY THE ICON
    userArea.appendChild(choiceIcon);
    systemArea.appendChild(systemIcon);

    // Create a Data Attribute to reflect who wins each round
    choiceIcon.setAttribute('data', '');
    systemIcon.setAttribute('data', '');

    //ANALYSE USER and SYSTEM CHOICES
    if (choice == options[systemPick]) {
        userScore += 0;
        systemScore += 0;
    } else switch (true) {
        case (choice == 'Rock' && options[systemPick] == 'Scissors'):
            userScore += 1;
            choiceIcon.setAttribute('data', 'win');
            systemScore += 0;
            break;

        case (choice == 'Rock' && options[systemPick] == 'Paper'):
            userScore += 0;
            systemScore += 1;
            systemIcon.setAttribute('data', 'win');
            break;

        case (choice == 'Paper' && options[systemPick] == 'Rock'):
            userScore += 1;
            choiceIcon.setAttribute('data', 'win');
            systemScore += 0;
            break;

        case (choice == 'Paper' && options[systemPick] == 'Scissors'):
            userScore += 0;
            systemScore += 1;
            systemIcon.setAttribute('data', 'win');
            break;

        case (choice == 'Scissors' && options[systemPick] == 'Rock'):
            userScore += 0;
            systemScore += 1;
            systemIcon.setAttribute('data', 'win');
            break;

        case (choice == 'Scissors' && options[systemPick] == 'Paper'):
            userScore += 1;
            choiceIcon.setAttribute('data', 'win');
            systemScore += 0;
            break;

    }
    userValue.textContent = userScore;
    systemValue.textContent = systemScore;

    // RESET VARIABLES
    uRock = '';
    uPaper = '';
    uScissors = '';
    sRock = '';
    sPaper = '';
    sScissors = '';

    //END GAME AFTER 15 Rounds
    if (gameCount == 15) {
        //var container = document.querySelector('.container');
        var messageBox = document.querySelector('.message');
        var message = document.querySelector('#m-text');
        faceOff.style.display = 'none';
        verify = '';

        //DISPLAY SCORE
        if (userScore > systemScore) {
            userValue.style.color = 'blue';
            userValue.style.fontWeight = 'bold';
            var msg = "YOU WIN";
        }
        if (systemScore > userScore) {
            userValue.style.color = 'red';
            userValue.style.fontWeight = 'bold';
            var msg = "YOU LOSE";
        }
        if (userScore == systemScore) {
            msg = "GAME DRAW";
        }

        // DISPLAY MESSAGE
        messageBox.style.display = 'flex';
        message.textContent = msg;

    }

}