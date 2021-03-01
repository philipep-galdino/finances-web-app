const transactionsUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')
const outgoingDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()    
    init()
}

const addTransactionsIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithNoOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span>${operator} $${amountWithNoOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
    `

    transactionsUl.append(li)
}

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getOutgoing = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)  

const updateBalanceValues = () => {
    const transactionsAmounts = transactions .map(({ amount }) => amount)

    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const outgoing = getOutgoing(transactionsAmounts)

    balanceDisplay.textContent = `$${total}`
    incomeDisplay.textContent = `$${income}`
    outgoingDisplay.textContent = `$${outgoing}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
} 

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isInputEmpty = transactionName === '' || transactionAmount === ''

    if (isInputEmpty) {
        alert('Please, type in the transactions name and value as well')

        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)