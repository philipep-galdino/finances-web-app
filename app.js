const transactionsUl = document.querySelector('#transactions')

const incomeDisplay = document.querySelector('#money-plus')
const outgoingDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')

const dummyTransactions = [
    { id: 1, name: 'Chocolate cake', amount: -20 },
    { id: 1, name: 'Salary', amount: 300 },
    { id: 1, name: 'Chicken pie', amount: -10 },
    { id: 1, name: 'Guitar', amount: 150 }
]

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithNoOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} $${amountWithNoOperator}</span><button class="delete-btn">x</button>
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
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
} 

init()