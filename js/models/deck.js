class Deck {
    constructor(attributes) {
        this.id = attributes.id
        this.title = attributes.title
        this.user_id = attributes.user_id
        this.cards = []
    }

    createPracticeSession() {
        this.practiceSession = new PracticeSession(this.cards.length)
    }

    currentCard() {
        const shuffled = this.practiceSession.shuffler
        const i = this.practiceSession.currentCardIndex
        return this.cards[shuffled[i]]
    }

    saveCardToDeck(card) {
        if (card instanceof Card) {
        this.cards.push(card)
        } else {
        console.log("this function will only save Card objects to the deck")
        }
    }

    saveCardsFromJson(cards) {
        cards.forEach((attributes) => {
        this.saveCardToDeck(new Card(attributes))
        })
    }

    save() {
        Content.allDecks.push(this)
        }
}
