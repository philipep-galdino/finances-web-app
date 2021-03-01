const transactionsUl = document.querySelector('#transactions')

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

const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM)
}

init()