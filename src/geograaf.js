'use srict'

class Geograaf {
    constructor(randLocality, guessRemain) {
        this.locality = randLocality
        
        // locality name preprocessing
        this.word = randLocality['name'].toUpperCase()
        this.word = this.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // this is done to get rid of e grave and e acute cymbols (French names)
        this.word = this.word.split('')
        
        this.guessRemain = guessRemain
        this.attemptedLetters = []
        this.wrongGuesses = []
        this.gameState = 'playing'

    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach(letter => {
            if (this.attemptedLetters.includes(letter) || letter === ' ' || letter === '-' || letter === "'"){
                puzzle += letter
            }
            else {
                puzzle += '*'
            }
        });

        return puzzle;
    }
    
    get status() {
        //locality type (town or city) and province or territory name
        let status = {
            gameState: this.gameState,
            locality:'',
            soundAlike:''
        }
        
        let province = this.locality['province']
        let localityType = this.locality['concise']['code']
        let soundAlike = this.locality['soundAlike']
        
        status['locality'] = `I'm thinking of a ${localityType.toLowerCase()} in ${province}.`
        status['soundAlike'] = `Its name sounds kinda like '${soundAlike}'. Or maybe it's just me...`

        return status
    }

    makeGuess(guess) {
        guess = guess.toUpperCase();
        const isUnique = !this.attemptedLetters.includes(guess)
        const goodGuess = this.word.includes(guess)
        
        if (isUnique) {
            this.attemptedLetters.push(guess)
        } else {
            console.log('you have already tried this one!')
        }

        if (!goodGuess & isUnique) {
            this.guessRemain -= 1
            this.wrongGuesses.push(guess)
        }
        this.updateStatus()
    }

    updateStatus() {
        let isNotRevealed = this.puzzle.includes('*')
        
        if (this.guessRemain <= 0 & isNotRevealed) {
            this.gameState = 'failed'
        } else if (!isNotRevealed) {
            this.gameState = 'won'
        }
    }
}

export {Geograaf}


