const express = require('express')
const app = express()
const https = require('https')
const axios = require('axios')

app.use((req, res, next) => {
  console.log(req.url)
  next();
})

let currencies = [
  "AED", "ARS", "AUD", "BGN", "BRL", "BSD", "CAD",
  "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "DOP",
  "EGP", "EUR", "FJD", "GBP", "GTQ", "HKD", "HRK",
  "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW",
  "KZT", "MXN", "MYR", "NOK", "NZD", "PAB", "PEN",
  "PHP", "PKR", "PLN", "PYG", "RON", "RUB", "SAR",
  "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "USD",
  "UYU", "VND", "ZAR"
]

app.get('/:from/:to/:amt', async function (req, res) {
  let { from, to, amt } = req.params;
  let rates = await axios.get("https://open.exchangerate-api.com/v6/latest")
    .catch((e) => {console.log(e)});
  rates = rates.data.rates;
  let conversionRate = rates[to] / rates[from]
  res.send((amt * conversionRate).toFixed(2));
})

app.get('/currencies', function (req, res) {
  res.send(currencies);
})

app.get('/usage', function (req, res) {
  res.send("/:from/:to/:amt\n");
})

app.get(['/', '/help', 'endpoints'], function (req, res) {
  res.send("/usage\n/currencies\n/:from/:to/:amt\n");
})

app.listen(80, "0.0.0.0");
