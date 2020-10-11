window.addEventListener("load",function(){
    const dummyData = 
    [
      {
        "name": "Nrupul",
        "email": "nrupul@masaischool.com",
        "password": "123456",
        "transactions": [
          {"title": "Salary", "type": "credit", "amount": 10000, "timestamp": "2020-10-01 09:00"},
          {"title": "Rent", "type": "debit", "amount": 5000, "timestamp": "2020-10-02 09:00"}
        ]
      },
      {
        "name": "Prateek",
        "email": "prateek@masaischool.com",
        "password": "123456",
        "transactions": [
          {"title": "Salary", "type": "credit", "amount": 10000, "timestamp": "2020-10-01 09:00"},
          {"title": "Rent", "type": "debit", "amount": 5000, "timestamp": "2020-10-02 09:00"}
        ]
      }
    ]
    localStorage.setItem("users",JSON.stringify(dummyData))
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
        // redirectToDashboard()
        // location.assign("dash.html")
        alert("Login Successful")
    }else {
        const warning = document.createElement("p")
        warning.innerHTML = message
        document.body.append(warning)
    }
}

function validate(email,password){
    const users = JSON.parse(localStorage.getItem("users"))
    let emailExist = false;
    let userExist = false;

    users.forEach(user => {
        if(user.email === email){
            emailExist = true
        }

        if(user.email === email && user.password === password){
            userExist = true 
        }
    });

    if(userExist){
        return "success"
    }else if(emailExist){
        return "Wrong Password"
    }else {
        return "Account doesn’t exists"
    }
}