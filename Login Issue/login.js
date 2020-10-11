window.addEventListener("load", function () {

    let form = document.querySelector("form")
    form.addEventListener("submit", handleLogin)
})

function handleLogin() {
    event.preventDefault();
    const form = new FormData(event.target)
    let email = form.get("email")
    let password = form.get("password")

    let message = validate(email, password)

    if (message == "success") {
        // redirectToDashboard()
        // location.assign("dash.html")
        alert("Login Successful")
    } else {
        const warning = document.createElement("p")
        warning.innerHTML = message
        document.body.append(warning)
    }
}

function validate(email, password) {
    const users = JSON.parse(localStorage.getItem("users"))
    let emailExist = false;
    let userExist = false;

    users.forEach(user => {
        if (user.email === email) {
            emailExist = true
        }

        if (user.email === email && user.password === password) {
            userExist = true
        }
    });

    if (userExist) {
        return "success"
    } else if (emailExist) {
        return "Wrong Password"
    } else {
        return "Account doesn’t exists"
    }
}