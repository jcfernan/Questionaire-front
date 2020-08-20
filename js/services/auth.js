    class Auth {

    static currentUser = {}

    static setCurrentUser(user) {
        if (user instanceof User) {
        this.currentUser = user
        }
    }

    static clearCurrentUser() {
        this.currentUser = {}
    }

    static getCurrentUser() {
        return API.get("/get_current_user")
        .then(json => this.handleCurrentUserResponse(json))
    }

    static handleCurrentUserResponse(json) {
        if (json.logged_in) {
        this.setCurrentUser(new User(json.user))
        Content.getUserDecks()
        } else {
        this.clearDataOnLogout()
        DOM.renderMainContainer()
        }
    }

    static get isSignedIn() {
        return this.currentUser instanceof User 
        }

        static submitLoginForm() {
        const email = document.getElementById("login-form-input-email").value
        const password = document.getElementById("login-form-input-password").value

        const userInfo = {
            user: {
            email,
            password
            }
        }

        if (email && password) {
            return API.post("/login", userInfo)
            .then(json => {
                if (json.logged_in) {
                this.setCurrentUser(new User(json.user))
                Content.getUserDecks()
                } else {
                alert(json.error)
                }
            })
        } else {
            alert("Email and password required for login.")
        }
        }


        static logoutUser() {
        API.post("/logout")
            .then(() => {
            this.clearDataOnLogout()
            DOM.renderMainContainer()
            })
        }

        static clearDataOnLogout() {
        this.clearCurrentUser()
        Content.clearUserContent()
        State.resetView()
        }

}