import express from "express";
import configViewEngine from "./config/configViewEngine";
// require('dotenv').config;
import {} from 'dotenv/config' 

const app = express()
const port = process.env.PORT || 8080
console.log(port)

configViewEngine(app)
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/home', (req, res) => {
    res.send('Welcome to Takis');
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})