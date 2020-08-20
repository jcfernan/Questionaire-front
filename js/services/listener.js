class Listener {

    static listenForClicks() {
        const body = document.querySelector("body")
        body.addEventListener("click", (e) => this.handleBodyClick(e))
    }

    static handleBodyClick(e) {
        e.preventDefault()
        switch(e.target.className) {
        case "form-submit":
            this.handleLoginFormClick(e)
            break
        case "nav-button":
            this.handleNavButtonClick(e)
            break
        case "dash-deck-title":
            State.setViewToPracticeView(e.target.id)
            DOM.renderMainContainer()
            break
        case "dash-deck-tab":
            this.handleDashDeckTabClick(e)
            break
        case "edit-card-tab":
            this.handleEditCardTabClick(e)
            break
        case "main-title-back":
            State.setViewToDashboard()
            DOM.renderMainContainer()
            break
        case "practice-card-button":
            this.handlePracticeButtonClick(e)
            break
        }
    }

    static handleLoginFormClick(e) {
        switch(e.target.id) {
        case "login-form-submit":
            Auth.submitLoginForm()
            break
        case "new-deck-form-submit":
            Content.submitNewDeckForm()
            break
        case "new-card-form-submit":
            Content.submitNewCardForm()
            break
        }
    }

    static handleNavButtonClick(e) {
        switch(e.target.id) {
        case "logout-button":
            Auth.logoutUser()
            break
        }
    }



    static handleDashDeckTabClick(e) {
        const deck_id = e.target.value
        switch(e.target.id) {
        case "dash-deck-delete":
            Content.requestDeleteDeck(deck_id)
            break
        case "dash-deck-edit":
            State.setViewToDeckEditor(deck_id)
            DOM.renderMainContainer()
            break
        case "dash-deck-play":
            State.setViewToPracticeView(deck_id)
            DOM.renderMainContainer()
            break
        }
    }

    static handleEditCardTabClick(e) {
        switch(e.target.id) {
        case "edit-card-tab-delete":
            Content.requestDeleteCard(e.target.value)
            break
        }
    }

    static handlePracticeButtonClick(e) {
        const practice = Content.findCurrentPracticeSessionUsingState()
        switch(e.target.id) {
        case "practice-card-button-show":
            State.setViewToShowAnswer()
            DOM.renderMainContainer()
            break
        case "practice-card-button-correct":
            practice.logScore(true)
            State.setViewToShowQuestion()
            DOM.renderMainContainer()
            break
        case "practice-card-button-incorrect":
            practice.logScore(false)
            State.setViewToShowQuestion()
            DOM.renderMainContainer()
            break
        case "practice-card-button-replay":
            Content.findDeckFromCurrentView().createPracticeSession()
            DOM.renderMainContainer()
            break
        }
    }

}