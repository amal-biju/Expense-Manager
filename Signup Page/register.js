window.addEventListener('load',function(){
    var form = document.querySelector('form')
    form.addEventListener('submit',register)
})
var array = []

function register(){

    event.preventDefault()
    var form = new FormData(event.target);
    // console.log(form);

    var name = form.get("name")
    var email = form.get("email")
    var password = form.get("password")

    var payload = {
        name: name,
        email: email,
        password: password
    }
    // console.log(payload);
    array.push(payload);
    console.log(array);
    localStorage.setItem("Users", JSON.stringify(array))

    var get = JSON.parse(localStorage.getItem('Users'));
    console.log(get);

    for(var i=0;i<get.length;i++){
        if(email==get[i].email){
           registerNotAllowed()
        }else{
            
        }
    }
}
function registerNotAllowed(){
    // var div = document.createElement('div');
    var p = document.createElement('p');
    p.innerHTML = "Account Aleady Exists"
    // div.appendChild(p)
    document.body.append(p);
}
