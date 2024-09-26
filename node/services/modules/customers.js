require('dotenv').config()

const { MongoOperations } = require('../db/mongo-operations');

const mongoConnection = new MongoOperations('project')
const addCustomer = async(customer)=>{
    mongoConnection.Collection = 'customers'
    const response = await mongoConnection.insertItem(customer)
    return response}

const addCustomers = async (customers)=>{
    mongoConnection.Collection = 'customers'
    const response = await mongoConnection.insertList(customers)
    return response
}

const findCustomer = async (filter)=>{
    mongoConnection.Collection = 'customers'
    const response = await mongoConnection.find(filter)
    return response
}

module.exports = {
    addCustomer,
    addCustomers,
    findCustomer
}