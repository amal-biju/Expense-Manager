var user = JSON.parse(localStorage.getItem("currentUser")) || []
window.addEventListener('load', function () {

    balanceFunction()

    var form = document.querySelector('form');
    form.addEventListener('submit', enterRecord)

})

const btn = document.querySelector('button');
btn.addEventListener("click", () => {
    localStorage.removeItem("currentUser")
    location.replace("login.html")
})

function balanceFunction() {

    var income = document.getElementById("income");
    var expense = document.getElementById("expense");
    var balance = document.getElementById("balance");
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""

    var credit = []
    for (var i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == "credit") {
            credit.push(user.transactions[i].amount)
        }
    }
    // var totalIncome = document.createElement('h3');
    var totalCredit = credit.reduce((acc, el) => acc + el, 0)
    income.innerHTML = `<h2>Total Income</h2><h3>${totalCredit}</h3>`
    // totalIncome.innerText = ""
    // totalIncome.innerText = totalCredit
    // income.append(totalIncome);

    var debit = []
    for (var i = 0; i < user.transactions.length; i++) {
        if (user.transactions[i].type == "debit") {
            debit.push(user.transactions[i].amount)
        }
    }
    // var totalExpense = document.createElement('h3');
    var totalDebit = debit.reduce((acc, el) => acc + el, 0)
    expense.innerHTML = `<h2>Total Expense</h2><h3>${totalDebit}</h3>`
    // totalExpense.innerText = ""
    // totalExpense.innerText = totalDebit
    // expense.append(totalExpense);

    var remainingBalance = totalCredit - totalDebit;
    balance.innerHTML = `<h2>Remaining Balance</h2><h3>${remainingBalance}</h3>`
    // var totalBalance = document.createElement('h3');
    // totalBalance.innerText = ""
    // totalBalance.innerText = remainingBalance
    // balance.append(totalBalance)


    for (var i = 0; i < Math.min(5, user.transactions.length); i++) {

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

        tbody.append(row);
    }
}

function enterRecord() {
    event.preventDefault()

    var form = new FormData(event.target);
    var title = form.get('title')
    var type = form.get('type')
    var amount = form.get('amount')

    var formTitle = document.getElementById("title")
    formTitle.value = ""

    var formAmount = document.getElementById("amount")
    formAmount.value = ""

    var payload = {
        title: title,
        type: type,
        amount: Number(amount),
        timestamp: new Date().toLocaleString()
    }

    user.transactions.unshift(payload);

    updateLocalStorageUsers()

    balanceFunction()
}

function updateLocalStorageUsers() {
    const users = JSON.parse(localStorage.getItem("users"))

    var index = 0

    users.forEach((item, i) => {
        if (item.email == user.email) {
            index = i
        }
    });

    users[index] = user
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(user))
}