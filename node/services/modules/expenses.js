require('dotenv').config()

const { MongoOperations } = require('../db/mongo-operations');

const mongoConnection = new MongoOperations('project')

const addExpense = async (expens) => {
    mongoConnection.Collection = 'expenses'
    const response = await mongoConnection.insertItem(expens)
    return response
}

const addExpenses = async (expenses) => {
    mongoConnection.Collection = 'expenses'
    const response = await mongoConnection.insertList(expenses)
    return response
}

const findExpense = async (filter) => {
    mongoConnection.Collection = 'expenses'
    const response = await mongoConnection.find(filter)
    return response
}

const getByMonth = async (month) => {
    mongoConnection.Collection = 'expenses'
    const allExpenses = await findExpense()
    const result = allExpenses.filter(e => new Date(e.date).getMonth() + 1 == month.month)
    return result
}

const getByYear = async (year) => {
    mongoConnection.Collection = 'expenses'
    const allExpenses = await findExpense()
    const result = allExpenses.filter(e => new Date(e.date).getFullYear() == year.year)
    return result
}

const getBy2Date = async (startDate, endDate) => {
    mongoConnection.Collection = 'expenses'
    const allExpenses = await findExpense()
    const result = allExpenses.filter(e => {
        const expenseDate = new Date(e.date);
        expenseDate.setHours(startDate.getHours())
        return expenseDate >= startDate && expenseDate <= endDate;
    })
    return result
}


module.exports = {
    addExpense,
    addExpenses,
    findExpense,
    getByMonth,
    getByYear,
    getBy2Date
}