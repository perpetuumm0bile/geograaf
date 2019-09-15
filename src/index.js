import {Geograaf} from './geograaf.js'
import {getRandLocality, getRandProvince} from './random-city.js'

let game

// Defining DOM elements
const body = document.querySelector('body')
const alphaboardEl = document.querySelector('.game__alphaboard')
const statusEl = document.querySelector('.game__status')
const soundAlikeEl = document.querySelector('.game__soundAlike')
const puzzleEl = document.querySelector('.game__puzzle')
const attemptsEl = document.querySelector('.game__attempts')
const gameSectionEl = document.querySelector('.game')

//Function for setting up DOM elements according to the game state
const renderGame = function(initial = false){

    if (initial === true){
        initAlpaboard()
    } else {
        updateAlphaboard()
    }
    
    if (game.gameState ==='playing'){
        statusEl.innerHTML = game.status['locality']
        soundAlikeEl.innerHTML = game.status['soundAlike']
        puzzleEl.textContent = `${game.puzzle}`
        attemptsEl.textContent = `${game.guessRemain} attempts left`
    
    } else {

        if (game.gameState === 'failed') {
            statusEl.innerHTML = "<span class='game__status__fail'>Argh!</span> You're out of luck!"
        } else {
            statusEl.innerHTML = "This is <span class='game__status__win'>amazing!</span> You've done it! Wanna play again?"
        }

        puzzleEl.textContent = game.word.join('')
        soundAlikeEl.textContent = ''
        attemptsEl.textContent = ''

        //adding the reset button
        const resetButton = document.createElement('button')
        resetButton.innerHTML = 'Play again'
        resetButton.className = 'game__resetButton'
        alphaboardEl.innerHTML = ''
        gameSectionEl.appendChild(resetButton)
        
        resetButton.addEventListener('click', function(){
            startGame()
            resetButton.remove()
        })
    }

}

//Function for setting up the alphabet board
const initAlpaboard = () => {

    const alphabetStart = 65
    const alphabetEnd = 91

    for(let letter = alphabetStart; letter<alphabetEnd; letter++){
        const letterButton = document.createElement('button')
        letterButton.id = String.fromCharCode(letter)
        letterButton.className = 'game__alphaboard__button'
        letterButton.innerHTML = String.fromCharCode(letter)
        alphaboardEl.appendChild(letterButton)
    }

}

//Function for updating a button state after it is pushed
const updateAlphaboard = () => {
    const lastGuess = game.attemptedLetters[game.attemptedLetters.length - 1]
    const pushedButton = document.querySelector(`#${lastGuess}`)
    
    if (game.wrongGuesses.includes(lastGuess)){

        pushedButton.className = 'game__alphaboard__button game__alphaboard__button--wrongLetter'
    
    } else {

        pushedButton.className = 'game__alphaboard__button game__alphaboard__button--correctLetter'
    }

}

// Function for starting a game
const startGame = async () => {
    const randLocality = await getRandLocality()
    game = new Geograaf(randLocality, 10)
    const initial = true
    
    renderGame(initial)
}

// Function for making an iteration each time user tries to guess a letter
const play = (guess) => {
    
    if (game.gameState === 'playing'){
        game.makeGuess(guess)
        game.updateStatus()
        renderGame()
    }
}


//Starting the game

startGame()

//Adding event listeners
alphaboardEl.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON'   
  if (!isButton) {
    return
  }
  
  event.srcElement.disabled = true
  const guess = event.target.innerText

  play(guess)
})

window.addEventListener('keypress', (event) => {
    const guess = String.fromCharCode(event.charCode)
    
    play(guess)
})