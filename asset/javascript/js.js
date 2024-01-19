let score = 0;
let gameStarted = false;
let gameIsOver = false;
let backgroundSound = new Audio("./asset/Audio/backgroundSound.mp3");
let jumpSound = new Audio("./asset/Audio/bounce.mp3");
let playButton = document.querySelector("#playButton");
let gameWidth = document.querySelector('main').offsetWidth
let gameHeigth = document.querySelector('main').offsetHeight
let scoreDisplay = document.querySelector("#score");
let timerDisplay = document.querySelector("#timer");
let levelButton = document.querySelector("#levelButton");
let resetTimeout;
let targetScore = 800;
let timerDuration = 15;
let gameInterval;
let timeInterval;
let selectedLevel;
let originalBackgroundColor;
let difficultyLevels = {
    easy: { timerDuration: 20 },
    medium: { timerDuration: 15 },
    hard: { timerDuration: 10 }
};

function updateTimer() {
    timerDuration--;
    timerDisplay.innerText = "Timer: " + timerDuration;
    if (timerDuration <= 0) {
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        endGame();
    }
}
function endGame() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    gameIsOver = true;
    if (score >= targetScore) {
        document.querySelector('#score').innerHTML = "Vous avez gagné! Score final: " + score + " points";
    } else {
        document.querySelector('#score').innerHTML = "Game Over. Score final: " + score + " points";
    }
    resetTimeout = setTimeout(resetGame, 2000);
}
function startGame() {
    if (!selectedLevel) {
        showModal();
        return;
    }
    backgroundSound.play();
    document.querySelector('#movingMario').style.display = 'block';
    gameStarted = true;
    playButton.style.display = 'none';
    levelButton.style.display = 'none';
    timerDuration = selectedLevel.timerDuration;
    gameInterval = setInterval(randomMove, 1000);
    timeInterval = setInterval(updateTimer, 1000);
    originalBackgroundColor = document.querySelector('main').style.backgroundColor;
}
function showModal() {
    document.getElementById('myModal').style.display = 'block';
    setTimeout(function () {
        document.getElementById('myModal').style.display = 'none';
    }, 3000); 
}

function resetGame() {
    document.querySelector('#movingMario').style.display = 'none';
    playButton.style.display = 'block';
    levelButton.style.display = 'block'
    score = 0;
    scoreDisplay.innerText = "Score: " + score;
    timerDuration = 12;
    timerDisplay.innerText = "Timer: " + timerDuration;
    gameStarted = false;
    gameIsOver = false;
    document.querySelector('main').style.backgroundColor = '';
    document.querySelector('main').style.backgroundColor = originalBackgroundColor;
    clearTimeout(resetTimeout);
}

function selectLevel(level, el) {
    document.getElementById('level1').style.background = '';
    document.getElementById('level2').style.background = '';
    document.getElementById('level3').style.background = '';
    switch (level) {
        case 1:
            selectedLevel = difficultyLevels.easy
            el.style.background = 'lightgreen';
            break;
        case 2:
            selectedLevel = difficultyLevels.medium
            console.log(el);
            el.style.background = 'lightblue';
            break;
        case 3:
            selectedLevel = difficultyLevels.hard
            el.style.background = 'lightcoral';
            break
        default:
            break;
    }

}

function handleClick() {
    if (gameStarted && !gameIsOver) {
        score = score + 100;
        scoreDisplay.innerText = "Score: " + score;
        jumpSound.play();
    }
}
function randomMove() {
    let img = document.querySelector("#movingMario");
    let randomXPercent = randomize(0, gameWidth - document.querySelector('#movingMario').offsetWidth);
    let randomYPercent = randomize(0, gameHeigth - document.querySelector('#movingMario').offsetHeight)
    img.style.left = randomXPercent + "px";
    img.style.top = randomYPercent + "px";

    if (jumpSound.currentTime === 0 || jumpSound.ended) {
        jumpSoundInstance.play();
    }
}
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
