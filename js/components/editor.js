class Editor {

    static viewDeckEditor() {
        const deck = Content.findDeckFromCurrentView()
        return `
            <div class="main-title">
            <div class="main-title-back">
                < Back to Dash
            </div>
            <div class="main-title-header">
                <h1>${deck.title}</h1>
            </div>          
            <div class="main-title-next"></div>
            </div>
            <div class="main-inner" id="editor-outer">
            <div class="main-content-area" id="editor-cards">
                ${this.viewAllEditorCards(deck)}
            </div>
            <div class="main-sidebar" id="editor-sidebar">
                ${Forms.viewNewCardForm}
            </div>
            </div>
        `
    }

    static viewEditorCard(card) {
        return `
        <div class="edit-card">
            <div class="edit-card-tabs">
            <button class="edit-card-tab" id="edit-card-tab-delete" value="${card.id}"></button>
            </div>
            <div class="edit-card-question">
            <h4>Question</h4>
            <p>${card.question}</p>
            </div>
            <div class="edit-card-answer">
            <h4>Answer</h4>
            <p>${card.answer}</p>
        </div>
        </div>
    `
    }

    static viewAllEditorCards(deck) {
    return deck.cards.sort((a, b) => b.id - a.id ).map((card) => this.viewEditorCard(card)).join("")
    }

}