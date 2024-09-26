const express = require('express');
const { findCustomer, addCustomer, addCustomers } = require('../services/modules/customers')

const router = express.Router()

router.get('/findCustomer/:filter?', async (req, res) => {
  try {
    const { filter } = req.params
    const customer = await findCustomer(filter)
    res.status(200).json(customer)
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addCustomer', express.json(), async (req, res) => {
  try {
    const customer = req.body;
    const newCustomer = await addCustomer(customer)
    res.status(201).send({ newCustomer })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addCustomers', express.json(), async (req, res) => {
  try {
    const customers = req.body;
    const newCustomers = await addCustomers(customers)
    res.status(201).send({ newCustomers })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;