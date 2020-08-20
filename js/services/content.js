class Content {

    static clearUserContent() {
        this.allDecks = []
    }

    static allDecks = []

    static removeDeletedDeck(id) {
        this.allDecks = this.allDecks.filter((d) => d.id != id)
    }

    static findDeckFromCurrentView() {
        return this.findDeckById(State.currentView.id)
    }

    static findCurrentPracticeSessionUsingState() {
        const deck = this.findDeckFromCurrentView()
        return deck.practiceSession
    }

    static findDeckById(deck_id) {
        return this.allDecks.find((d) => d.id == deck_id)
    }

    static removeDeletedCard(card_data) {
        const deck = this.findDeckById(card_data.deck_id)
        deck.cards = deck.cards.filter((c) => c.id != card_data.id)
        }

        static getUserDecks() {
        return API.get(`/users/${Auth.currentUser.id}/decks`)
            .then(json => {
            this.loadUserDecks(json)
            })
        }

        static loadUserDecks(json) {
        json.forEach(deckData => {
            const deck = new Deck(deckData)
            deck.saveCardsFromJson(deckData.cards)
            deck.createPracticeSession()
            deck.save()
        })
        DOM.renderMainContainer()
        }

        static submitNewDeckForm() {
        const title = document.getElementById("new-deck-form-input-title").value
        if (!!title) {
            const deckInfo = { deck: { title } }

            API.post(`/users/${Auth.currentUser.id}/decks`, deckInfo)
            .then(json => {
                this.handleNewDeckResponse(json)
            })
        } else {
            alert("Please enter a title for your deck.")
        }
        }

        static handleNewDeckResponse(json) {
        if (json.deck) {
            const deck = new Deck(json.deck)
            deck.save()
            DOM.renderMainContainer()
        } else if (json.errors) {
            alert(json.errors)
        }
        }

        static requestDeleteDeck(deck_id) {
        API.delete(`/users/${Auth.currentUser.id}/decks/${deck_id}`)
            .then(json => this.handleDeleteDeckResponse(json))
        }

        static handleDeleteDeckResponse(json) {
        if (json.deleted) {
            this.removeDeletedDeck(json.deck.id)
            DOM.renderMainContainer()
        } else {
            alert(json.errors)
        }
        }

        static submitNewCardForm() {
        const deck_id = State.currentView.id
        const question = document.getElementById("new-card-form-input-question").value
        const answer = document.getElementById("new-card-form-input-answer").value

        const cardInfo = { card: { question, answer } }

        if (!!question && !!answer) {
            API.post(`/users/${Auth.currentUser.id}/decks/${deck_id}/cards`, cardInfo)
            .then(json => {
            this.handleNewCardResponse(json)
            })

        } else {
            alert("Please enter both a question and an answer for your new card.")
        }
        }

        static handleNewCardResponse(json) {
        if (!!json.card) {
            const card = new Card(json.card)
            const deck = Content.allDecks.find((d) => d.id == card.deck_id)
            deck.saveCardToDeck(card)
            DOM.renderMainContainer()
        } else {
            console.log(deck)
        }
        }

        static requestDeleteCard(card_id) {
        const deck_id = State.currentView.id
        API.delete(`/users/${Auth.currentUser.id}/decks/${deck_id}/cards/${card_id}`)
            .then(json => this.handleDeleteCardResponse(json))
        }

        static handleDeleteCardResponse(json) {
        if (json.deleted) {
            this.removeDeletedCard(json.card)
            DOM.renderMainContainer()
        } else {
            alert(json.errors)
        }
        }

}
