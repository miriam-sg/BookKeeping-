const express = require('express');
const {  addRevenue, addRevenues, findRevenue, getByMonth, getByYear, getBy2Date,getByCust} = require('../services/modules/revenues');

const router = express.Router()

router.get('/findRevenue/:filter?', async (req, res) => {
  try {
    const  filter  = req.query
    const Revenue = await findRevenue(filter)
    res.status(200).json({ Revenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addRevenue', express.json(), async (req, res) => {
  try {
    const Revenue = req.body;
    const newRevenue = await addRevenue(Revenue)
    res.status(201).send({ newRevenue })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addRevenues', express.json(), async (req, res) => {
  try {
    const Revenues = req.body;
    const newRevenues = await addRevenues(Revenues)
    res.status(201).send({ newRevenues })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;