document.addEventListener("DOMContentLoaded", init)

    function init() {
    Auth.getCurrentUser()
    Listener.listenForClicks()
}
