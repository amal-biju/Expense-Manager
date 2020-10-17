window.addEventListener("load",function(){
    
    let form = document.querySelector("form")
    form.addEventListener("submit",handleLogin)
})

function handleLogin(){
    event.preventDefault();
    const form = new FormData(event.target)
    let email = form.get("email")
    let password = form.get("password")

    let message = validate(email,password)

    if(message == "success"){
        location.assign("dash.html")
    }else {
        const warning = document.getElementById("warning")
        warning.innerHTML = message
        if(message == "Account doesn’t exists"){
            const anchor = document.querySelector('a');
            anchor.classList.remove("hide")
        }
    }
}

function validate(email,password){
    const users = JSON.parse(localStorage.getItem("users"))
    let emailExist = false;
    let userExist = false;

    for(let user of users){
        if(user.email === email && user.password === password){
            localStorage.setItem("currentUser",JSON.stringify(user))
            return "success"
        }
        if(user.email === email){
            return "Wrong Password"
        }
    }
    return "Account doesn’t exists"
}