window.addEventListener('load', function () {
    var form = document.querySelector('form')
    form.addEventListener('submit', register)
})

var array = []

function register() {
    const anchor = document.querySelector('a');
    anchor.classList.remove("hide")

    event.preventDefault()
    var form = new FormData(event.target);
    // console.log(form);

    var name = form.get("name")
    var email = form.get("email")
    var password = form.get("password")

    var payload = {
        name: name,
        email: email,
        password: password,
        transactions:[]
    }
    // console.log(payload);
    array = JSON.parse(localStorage.getItem('users')) || [];

    var match = true;

    if (array != null) {
        // console.log(array);
        for (var i = 0; i < array.length; i++) {
            if (email == array[i].email) {
                registerNotAllowed()
                match = false
            }
        }
    }

    if (match) {
        var status = document.getElementById("status")
        status.innerText = "Registration Successful"

        array.push(payload);
        // console.log(array);
        localStorage.setItem("users", JSON.stringify(array))
    }

}
function registerNotAllowed() {
    var status = document.getElementById("status")
    status.innerText = "User Already Exists"
}
