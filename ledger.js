window.addEventListener("load", () => {
    fillTableData( "all" )
})

const select = document.getElementById('type');
select.addEventListener("change", () => fillTableData( select.value ))

function fillTableData( type ){

    let tableData = []
    const transactions = JSON.parse(localStorage.getItem("currentUser")).transactions
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""

    if( type == "all"){
        tableData = [...transactions]
    }else{
        tableData = transactions.filter(item => item.type == type)
    }

    tableData.forEach(transaction => {
        var row = document.createElement('tr');

        var title = document.createElement('td');
        title.innerText = transaction.title;
        row.appendChild(title);

        var type = document.createElement('td')
        type.innerText = transaction.type;
        row.appendChild(type);


        var amount = document.createElement('td');
        amount.innerText = transaction.amount;
        row.appendChild(amount);


        var time = document.createElement('td')
        time.innerText = transaction.timestamp;
        row.appendChild(time);

        tbody.append(row);
    });

}