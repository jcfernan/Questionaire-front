class State {

    static currentView = {
        view: false,
        id: false,
        showAnswer: false
    } 

    static resetView() {
        this.currentView = {
        view: false,
        id: false,
        showAnswer: false
        }
    }

    static renderCurrentView() {
        switch(this.currentView.view) {
        case"deck-editor":
            return Editor.viewDeckEditor()
            break
        case("dashboard"):
            return Dashboard.viewDash
            break
        case("practice-view"):
            return PracticeView.viewDeckPractice()
            break
        default:
            return Auth.isSignedIn ? Dashboard.viewDash : Forms.viewLoginForm
            break
        }
    }

    static setViewToDashboard() {
        this.resetView()
        this.currentView.view = "dashboard"
    }

    static setViewToDeckEditor(deck_id) {
        this.resetView()
        this.currentView.view = "deck-editor"
        this.currentView.id = deck_id
        }

        static setViewToPracticeView(deck_id) {
        this.currentView.view = "practice-view"
        this.currentView.id = deck_id
        }

        static setViewToShowAnswer() {
        this.currentView.showAnswer = true
        }

        static setViewToShowQuestion() {
        this.currentView.showAnswer = false
        }

}