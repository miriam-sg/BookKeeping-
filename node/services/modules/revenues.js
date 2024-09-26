require('dotenv').config()

const { MongoOperations } = require('../db/mongo-operations');

const mongoConnection = new MongoOperations('project')

const addRevenue = async (revenu) => {
    mongoConnection.Collection = 'revenues'
    const response = await mongoConnection.insertItem(revenu)
    return response
}

const addRevenues = async (revenues) => {
    mongoConnection.Collection = 'revenues'
    const response = await mongoConnection.insertList(revenues)
    return response
}

const findRevenue = async (filter) => {
    mongoConnection.Collection = 'revenues'
    const response = await mongoConnection.find(filter)
    return response
}

module.exports = {
    addRevenue,
    addRevenues,
    findRevenue,
}