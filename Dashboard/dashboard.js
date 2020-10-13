    var user =
    {
        "name": "Nrupul",
        "email": "nrupul@masaischool.com",
        "password": "123456",
        "transactions": [
            { "title": "Salary", "type": "credit", "amount": 10000, "timestamp": "2020-10-01 09:00" },
            { "title": "Rent", "type": "debit", "amount": 5000, "timestamp": "2020-10-02 09:00" },
            { "title": "Salary", "type": "credit", "amount": 10000, "timestamp": "2020-10-01 09:00" },
            { "title": "Rent", "type": "debit", "amount": 5000, "timestamp": "2020-10-02 09:00" }, { "title": "Salary", "type": "credit", "amount": 10000, "timestamp": "2020-10-01 09:00" },
            { "title": "Rent", "type": "debit", "amount": 5000, "timestamp": "2020-10-02 09:00" }
        ]
    }
    // console.log(user);
window.addEventListener('load', function () {

    balanceFunction()
   
    var form = document.querySelector('form');
    form.addEventListener('submit',enterRecord)

})

function balanceFunction(){

    var income = document.getElementById("income");
    var expense = document.getElementById("expense");
    var bal = document.getElementById("bal");

    var credit = []
    for (var i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == "credit") {
            credit.push(user.transactions[i].amount)
        }
    }
    var hincome = document.createElement('h3');
    var totalCredit = credit.reduce((acc, el) => acc + el)
    hincome.innerText = totalCredit
    income.append(hincome);

    var debit = []
    for (var i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == "debit") {
            debit.push(user.transactions[i].amount)
        }
    }
    var hexpense = document.createElement('h3');
    var totalDebit = debit.reduce((acc, el) => acc + el)
    hexpense.innerText = totalDebit
    expense.append(hexpense);

    var balance = totalCredit - totalDebit;
    var hbalance = document.createElement('h3');
    hbalance.innerText = balance
    bal.append(hbalance)

    var table = document.getElementById("table");

    for (var i = 0; i < 5; i++) {
        // console.log(user.transactions[i])

        var row = document.createElement('tr');

        var title = document.createElement('td');
        title.innerText = user.transactions[i].title;
        row.appendChild(title);

        var type = document.createElement('td')
        type.innerText = user.transactions[i].type;
        row.appendChild(type);


        var amount = document.createElement('td');
        amount.innerText = user.transactions[i].amount;
        row.appendChild(amount);


        var time = document.createElement('td')
        time.innerText = user.transactions[i].timestamp;
        row.appendChild(time);

        table.append(row);
    }
}

function enterRecord(){
    event.preventDefault()
    var form = new FormData(event.target);
    var title = form.get('title')
    var type = form.get('type')
    var amount = form.get('amount')
    
    var payload = {
        title:title,
        type:type,
        amount:Number(amount),
        timestamp:Date()
    }
    
    user.transactions.unshift(payload);
    var use = JSON.stringify(user);
    localStorage.setItem("user",use);
    // console.log(user);
    balanceFunction()
}