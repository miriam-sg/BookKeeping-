require('dotenv').config()

const { MongoOperations } = require('../db/mongo-operations');

const mongoConnection = new MongoOperations('project')

const addReceipt = async (receipt) => {
    mongoConnection.Collection = 'receipts'
    const response = await mongoConnection.insertItem(receipt)
    return response
}

const addReceipts = async (receipts) => {
    mongoConnection.Collection = 'receipts'
    const response = await mongoConnection.insertList(receipts)
    return response
}

const findReceipt = async (filter) => {
    mongoConnection.Collection = 'receipts'
    const response = await mongoConnection.find(filter)
    return response
}

const getByMonth = async (month) => {
    mongoConnection.Collection = 'receipts'
    const allRevenues = await findReceipt()
    const result = allRevenues.filter(e => new Date(e.date).getMonth() + 1 == month.month)    
    return result
}

const getByYear = async (year) => {
    mongoConnection.Collection = 'receipts'
    const allRevenues = await findReceipt()
    const result = allRevenues.filter(e => new Date(e.date).getFullYear() == year.year)
    return result
}

const getBy2Date = async (startDate, endDate) => {
    mongoConnection.Collection = 'receipts'
    const allRevenues = await findReceipt()
    const result = allRevenues.filter(e =>{
        const revenuesDate = new Date(e.date);
        revenuesDate.setHours(startDate.getHours())        
        return revenuesDate >= startDate && revenuesDate <= endDate;
    })    
    return result
}
const getByCust = async (customer) => {
    mongoConnection.Collection = 'receipts'
    const allRevenues = await findReceipt()        
    const result = allRevenues.filter(r => r.customer == customer )    
    return result
}

module.exports = {
    addReceipt,
    addReceipts,
    findReceipt,
    getByMonth,
    getByYear,
    getBy2Date,
    getByCust
}