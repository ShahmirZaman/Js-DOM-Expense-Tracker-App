const balance = document.querySelector('#total-balance');
console.log(balance);
const income = document.querySelector('#inc-money')
console.log(income);
const expense = document.querySelector('#exp-money')
console.log(expense)
const list = document.querySelector('#list')
console.log(list);
const description = document.querySelector('#description')
console.log(description)
const amount = document.querySelector('#amount');
console.log(amount);
const form = document.querySelector('.transaction-form');
console.log(form)

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
console.log(localStorageTransactions);
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
console.log(transactions);

function addTransactions(e) {
    e.preventDefault();
    if(description.value === "" || amount.value === "") {
        alert("Please Add Description and Amount!");
    } else {
        let transactionObj = {
            id:Date.now(),
            desc:description.value,
            amount:+amount.value,
        }
        transactions.push(transactionObj);
        console.log("===>>>>",transactions);
        addTransactionDOM(transactionObj);
        updateValues();
        updateLocalStorage();

        description.value = "";
        amount.value = "";
    }
}
function addTransactionDOM(transactionObj) {
    const sign  = transactionObj.amount > 0 ? "+" : "-";
    const item = document.createElement('li');
    item.classList.add(transactionObj.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
    <span>${transactionObj.desc}</span>
    <span>${sign}${Math.abs(transactionObj.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transactionObj.id})">X</button>
    `;
    list.appendChild(item);
}
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    console.log(amounts);
    const total = amounts.reduce((prev,curr) => {
        console.log(prev,"====>>>>acc");
        console.log(curr,"===>>>>item");
        return prev+=curr;
    }
    ,0);
    console.log(total);
    const expFilterAmount = amounts.filter((exp) => exp < 0);
    console.log("===>>>Expense",expFilterAmount);
    const expTotal = expFilterAmount.reduce((acc,curr) => {
        console.log("===>>>",acc);
        console.log("===>>>>",curr);
        return acc+=curr;
    },0) * -1;
    console.log("expTotal",expTotal);
    const incFilterAmount = amounts.filter((inc) => inc > 0);
    console.log("===>>>Income",incFilterAmount);
    const incTotal = incFilterAmount.reduce((acc,curr) => {
        console.log("===>>>",acc);
        console.log("===>>>>",curr);
        return acc+=curr;
    },0) 
    console.log("incTotal",incTotal);

    balance.innerHTML = `$${total}`;
    income.innerHTML = `$${incTotal}`;
    expense.innerHTML = `$${expTotal}`;
}
function removeTransaction(id) {
    transactions = transactions.filter((transactionObj) => transactionObj.id !== id );
    updateLocalStorage();
    appStart();
}
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
function appStart() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
appStart();
form.addEventListener('submit',addTransactions);
