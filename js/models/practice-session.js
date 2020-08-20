class PracticeSession {

    constructor(cardCount) {
        this.cardCount = cardCount
        this.currentCardIndex = 0
        this.correctCardsCount = 0
        this.shuffler = PracticeSession.makeShuffler(cardCount)
    }

    logScore(correctness) {
        if (correctness === true) { 
        this.correctCardsCount++ 
        this.currentCardIndex++
        } else if (correctness === false) {
        this.currentCardIndex++
        } else {
        console.log("TYPE ERROR: logScore can only receive booleans as arguments")
        }
    }

    renderProgress() {
        return `${this.currentCardIndex} / ${this.cardCount}`
    }

    renderScorePercentage() {
        const a = this.correctCardsCount
        const b = this.currentCardIndex === 0 ? 1 : this.currentCardIndex
        return `${Math.floor((a / b) * 100)}%`
    }

    stillInProgress() {
    return this.currentCardIndex < this.cardCount
    }


    static makeShuffler(cardCount) {
    const arr = Array.from(Array(cardCount).keys())
    function shuffleArray(a) {
        let array = a
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
        }
        return array
    }

    return shuffleArray(arr)
    }

}