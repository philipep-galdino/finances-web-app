const transactionsUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')
const outgoingDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

let dummyTransactions = [
    { id: 1, name: 'Chocolate cake', amount: -20 },
    { id: 2, name: 'Salary', amount: 300 },
    { id: 3, name: 'Chicken pie', amount: -10 },
    { id: 4, name: 'Guitar', amount: 150 }
]

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    init()
}

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithNoOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} $${amountWithNoOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
            x
        </button>
    `

    transactionsUl.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
        .map(transaction => transaction.amount)

    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)

    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    
    const outgoing = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)    

    balanceDisplay.textContent = `$${total}`
    incomeDisplay.textContent = `$${income}`
    outgoingDisplay.textContent = `$${outgoing}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
} 

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert('Please, type in the transactions name and value as well')

        return
    }

    const transaction = { 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    }

    dummyTransactions.push(transaction)
    init()

    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
})