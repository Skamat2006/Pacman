//game state variables
let gameState = {
    pause: false,
    start: true,
    restart: false,
    endGame: false,
    playing: false,
};

let playing = true;
let paused = false;
let aniID = 0
let delay = 0

//layout variables
const grid = document.querySelector('.grid');
const width = 28 //28 X 28 = 784 squares

//layout description
//0 - pac-dots
//1 - wall
//2 - ghost-lair
//3 - power-pellets
//4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

//this is where we will push the block
const blocks = []

//variable to store the score
let score = 0;
const scoreDisplay = document.getElementById('score');

//variable to store the lives
let lives = 3;
const livesDisplay = document.getElementById('lives')

//variable to store display message to the player
let displayMessage = document.getElementById('displayMessage')

//variables for the audio files
let startSound = new Audio('assets/sounds/start.wav');
let eatFood = new Audio('assets/sounds/food.wav')
let eatGhost = new Audio('assets/sounds/eatghost.wav')
let powerFood = new Audio('assets/sounds/powerFood.wav')
let deathOfPacMan = new Audio('assets/sounds/death.wav')
let win = new Audio('assets/sounds/extrapac.wav')
let scaredGhost = new Audio('assets/sounds/intermission.wav')

//position variables for the game play components
// 1. starting position of pac-man
let pacmanCurrentIndex = 490;
let pacmanStartIndex = 490;

//creating our ghost template
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

//here with our class we can create our ghosts for the game
let ghosts
ghosts = [
    new Ghost('blinky', 348, 250), // we specified 1st name, 2nd startIndex, third speed
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

//setting up clock function
let displaySecs = document.getElementById('secs')
let displayMins = document.getElementById('mins')

let Clock = {
    totalSeconds: 0,
    start: function () {
        if (!this.interval) {
            let self = this;
            function pad(val) { return val > 9 ? val : "0" + val; }
            this.interval = setInterval(function () {
                self.totalSeconds += 1;
                displayMins.innerHTML = pad(Math.floor(self.totalSeconds / 60 % 60));
                displaySecs.innerHTML = pad(parseInt(self.totalSeconds % 60));
            }, 1000);
        }
    },

    restart: function () {
        Clock.totalSeconds = 0;
        clearInterval(this.interval);
        displayMins.innerHTML = "00";
        displaySecs.innerHTML = "00";
        delete this.interval;
        this.restart();
    },
    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
    },

    continue: function () {
        this.start();
    },
};

//creating the Board
const createBoard = () => {
    for (let i = 0; i < layout.length; i++) {
        const block = document.createElement('div')
        grid.appendChild(block)
        blocks.push(block)

        //add layout to the board
        if (layout[i] === 0) {
            blocks[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            blocks[i].classList.add('wall')
        } else if (layout[i] === 2) {
            blocks[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            blocks[i].classList.add('power-pellet')
        } else if (layout[i] === 4) {
            blocks[i].classList.add('empty')
        }
    }
}

//function that moves pac-man
const movePacMan = (e) => {
    // // blocks[pacmanCurrentIndex].classList.add('pac-man');
    blocks[pacmanCurrentIndex].classList.remove("pac-man", 'pac-man-left', 'pac-man-up', 'pac-man-down');
    //this switch case is used to help move pacman within the walls of the grid 
    //and when key is pressed
    switch (e.keyCode) {
        case 37: //left key
            if (
                pacmanCurrentIndex % width !== 0 &&
                !blocks[pacmanCurrentIndex - 1].classList.contains("wall")
            )
                pacmanCurrentIndex -= 1;
            //check if pacman is in the left exit.
            if ((pacmanCurrentIndex - 1) === 363) {
                pacmanCurrentIndex = 391
            }
            blocks[pacmanCurrentIndex].classList.add('pac-man-left');
            break;
        case 38: // up key
            if (
                pacmanCurrentIndex - width >= 0 &&
                !blocks[pacmanCurrentIndex - width].classList.contains("wall")
            )
                pacmanCurrentIndex -= width;
            blocks[pacmanCurrentIndex].classList.add('pac-man-up')
            break;
        case 39: // right key
            if (
                pacmanCurrentIndex % width < width - 1 &&
                !blocks[pacmanCurrentIndex + 1].classList.contains("wall")
            )
                pacmanCurrentIndex += 1;

            //check if pacman is in the left exit.
            if ((pacmanCurrentIndex + 1) === 392) {
                pacmanCurrentIndex = 364
            }
            break;
        case 40: // down key 
            if (
                pacmanCurrentIndex + width < width * width &&
                !blocks[pacmanCurrentIndex + width].classList.contains("wall")
            )
                pacmanCurrentIndex += width;
            blocks[pacmanCurrentIndex].classList.add('pac-man-down')
            break;
    }
    blocks[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkGameOver()
    checkForWin()
}

const pacDotEaten = () => {
    //Here we say if the index where pac-man is contains a pac-dot then it will removed.
    //the each dot remove will increment score by 1.
    if (blocks[pacmanCurrentIndex].classList.contains('pac-dot')) {
        eatFood.play();
        score++
        scoreDisplay.innerHTML = score
        blocks[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

//this function will decide what happens when the power-pellets are eaten by pacman.
const powerPelletEaten = () => {
    if (blocks[pacmanCurrentIndex].classList.contains('power-pellet')) {
        powerFood.play();
        score += 10
        scoreDisplay.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        //set 10 secs of scaredstate for the ghosts, enables them eatable by pacman
        setTimeout(unScaredGhosts, 10000)
        blocks[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

//this function will make the ghost unscared by changing them back to original colours.
const unScaredGhosts = () => {
    ghosts.forEach(ghost => ghost.isScared = false)
}


//we use for each method on our ghost array and we use arrow function to seperate out each 
//item from our array of ghost and call it ghost
//for each ghost we take the currentIndex and put in out blocks on our grid
//then we add the our Ghost class name to it.
// we also add the class ghost which has no styling, its just to see if there is a ghost.
// // ghosts.forEach(ghost => {
// //     blocks[ghost.currentIndex].classList.add(ghost.className)
// //     blocks[ghost.currentIndex].classList.add('ghost')
// // })

//moving the ghosts randomly
// // ghosts.forEach(ghost => moveGhosts(ghost))

//function to move the ghosts
function moveGhosts(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    // ghost.timerId = setInterval(function () {
        //if the next block your ghost is going to go in does NOT contain a wall && a ghost
        //then you can go there
        if (!blocks[ghost.currentIndex + direction].classList.contains('wall') &&
            !blocks[ghost.currentIndex + direction].classList.contains('ghost')) {
            //you can go here
            //remove all ghost related classes
            blocks[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            //change the currentIndex to new safe block
            ghost.currentIndex += direction
            //redraw the ghost in the new safe space.
            blocks[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            //else try to find a new direction
        } else direction = directions[Math.floor(Math.random() * directions.length)]


        //if our ghost is currently scared
        if (ghost.isScared) {
            scaredGhost.play();
            blocks[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost are scared and pacman is in the same index remove the ghost
        if (ghost.isScared && blocks[ghost.currentIndex].classList.contains('pac-man', 'pac-man-left', 'pac-man-up', 'pac-man-down')) {
            eatGhost.play();
            score += 100
            scoreDisplay.innerHTML = score
            blocks[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            blocks[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkGameOver()
    // }, 1000)
}

//check for gameOver
const checkGameOver = () => {
    //game-over when time is 2 mins up 
    if (Clock.totalSeconds === 120 ) {
        deathOfPacMan.play();
        // ghosts.forEach(ghost => clearInterval(ghost.timerId))
        cancelAnimationFrame(aniID)
        document.removeEventListener('keydown', movePacMan)
        displayMessage.innerHTML = "GAME OVER 😞"
        Clock.pause()
        gameState.endGame = true
        gameState.playing = false
    }

    if (lives === 3 || lives === 2 || lives === 1) {
        //if pacman is in the same block as the ghost that are not scared then pacman will die.
        if (blocks[pacmanCurrentIndex].classList.contains('ghost') &&
            !blocks[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            lives--
            livesDisplay.innerHTML = lives
            blocks[pacmanCurrentIndex].classList.remove('pac-man', 'pac-man-left', 'pac-man-up', 'pac-man-down')
            deathOfPacMan.play();
            pacmanCurrentIndex = pacmanStartIndex
            blocks[pacmanCurrentIndex].classList.add('pac-man')
        }
    } else if (lives === 0) {
        deathOfPacMan.play();
        // ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //cancelAnimationFrame(aniID)
        document.removeEventListener('keydown', movePacMan)
        displayMessage.innerHTML = "GAME OVER 😞"
        Clock.pause()
        cancelAnimationFrame(aniID)
        gameState.endGame = true
        gameState.playing = false
    }
}



//check for win
const checkForWin = () => {
    if (score >= 274) {
        win.play();
        // ghosts.forEach(ghost => clearInterval(ghost.timerId))
        cancelAnimationFrame(aniID)
        document.removeEventListener('keydown', movePacMan)
        displayMessage.innerHTML = "YOU WON 😊"
        Clock.pause()
        gameState.playing = false
    }
}

//function defining steps for game execution during gameplay, it controls the flow of the game. 
//Each cycle through the gameloop is known as a frame. If a game runs at 60FPS, 
//this means that the program cycles through the gameloop 60 times per second.
const gameLoop = () => {
    if (delay >= 10) {
        if (!gameState.pause) {
            startSound.play();
            blocks[pacmanCurrentIndex].classList.add('pac-man');
            document.addEventListener('keydown', movePacMan)
            ghosts.forEach(ghost => {
                blocks[ghost.currentIndex].classList.add(ghost.className)
                blocks[ghost.currentIndex].classList.add('ghost')
            })
            ghosts.forEach(ghost => moveGhosts(ghost))
            checkGameOver()
            checkForWin()
            if (!gameState.playing) return
            
        } else {
            pauseState()
        }
        delay = 0
    }
    delay++
    aniID = requestAnimationFrame(gameLoop)
}

createBoard()

//stating the boolean conditions for pauseState
const pauseState = () => {
    if (gameState.pause) {
        playing = false
        paused = true
        cancelAnimationFrame(aniID)
    }
}

//function controlling the keyevents for start, pause, continue, & restatrt
const control = (e) => {
    if (e.key === "p" || e.key === "P") {
        if (gameState.playing) {
            gameState.pause = true
            gameState.playing = false
            Clock.pause()
            cancelAnimationFrame(aniID)
            // ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown', movePacMan)
            displayMessage.innerHTML = "Game Paused 🖐"
        }
    } else if (e.key === 'c' || e.key === 'C') {
        if (gameState.pause) {
            gameState.playing = true
            gameState.pause = false
            playing = true
            paused = false
            Clock.continue()
            gameLoop()
            // requestAnimationFrame(gameLoop)
            displayMessage.innerHTML = " "
        }
    } else if (e.key === 'r' || e.key === 'R') {
        location.reload()
    } else if (e.key === 'Enter') {
        if (!gameState.playing) {
            gameState.playing = true;
            gameLoop()
            // requestAnimationFrame(gameLoop)
            if (gameState.start) {
                Clock.start()
                gameState.start = false
            }
        }
    }
}

document.addEventListener("keydown", function (e) {
    control(e);
});