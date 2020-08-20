class DOM {

    static renderMainContainer() {
        const main = document.getElementById("main")
        main.innerHTML = State.renderCurrentView()
    }
}