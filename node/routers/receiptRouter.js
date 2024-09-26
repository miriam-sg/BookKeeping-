const express = require('express');
const {findReceipt, addReceipt, addReceipts, getByMonth, getByYear, getBy2Date, getByCust } = require('../services/modules/receipts')

const router = express.Router()

router.get('/findReceipt/:filter?', async (req, res) => {
  try {
    const { filter } = req.params
    const Receipt = await findReceipt(filter)
    res.status(200).json({ Receipt })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addReceipt', express.json(), async (req, res) => {
  try {
    const Receipt = req.body;
    const newReceipt = await addReceipt(Receipt)
    res.status(201).send({ newReceipt })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addReceipts', express.json(), async (req, res) => {
  try {
    const receipts = req.body;
    const newreceipts = await addReceipts(receipts)
    res.status(201).send({ newreceipts })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getByCust/:customer?', async (req, res) => {
  try {
    const { customer } = req.params
    const Revenue = await getByCust(customer)
    res.status(200).json({ Revenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})


router.get('/getByMonth/:month?', async (req, res) => {
  try {
    const  month  = req.params
    const Revenue = await getByMonth(month)
    res.status(200).json({ Revenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getByYear/:year?', async (req, res) => {
  try {
    
    const  year  = req.params      
    const Revenue = await getByYear(year)
    res.status(200).json({ Revenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/getBy2Date/:startDate/:endDate', async (req, res) => {
  try {
    const { startDate,endDate } = req.params
    const Revenue = await getBy2Date(new Date(startDate),new Date(endDate))
    res.status(200).json({ Revenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})


module.exports = router;