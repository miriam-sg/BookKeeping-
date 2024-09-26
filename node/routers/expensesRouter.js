const express = require('express');
const { addExpense, addExpenses, getByMonth, getByYear, getBy2Date, findExpense } = require('../services/modules/expenses')

const router = express.Router()

router.get('/findExpense/:filter?', async (req, res) => {
  try {
    const filter = req.query
    const expense = await findExpense(filter)
    res.status(200).json(expense)
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getByMonth/:month?', async (req, res) => {
  try {
    const month = req.params
    const expense = await getByMonth(month)
    res.status(200).json({ expense })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getByYear/:year?', async (req, res) => {
  try {
    const year = req.params
    const expense = await getByYear(year)
    res.status(200).json({ expense })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getBy2Date/:startDate/:endDate', async (req, res) => {
  try {
    const { startDate, endDate } = req.params
    const expense = await getBy2Date(new Date(startDate), new Date(endDate))
    res.status(200).json({ expense })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addExpense', express.json(), async (req, res) => {
  try {
    const expense = req.body;
    const newexpense = await addExpense(expense)
    res.status(201).send({ newexpense })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addExpenses', express.json(), async (req, res) => {
  try {
    const expenses = req.body;
    const newexpenses = await addExpenses(expenses)
    res.status(201).send({ newexpenses })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;
