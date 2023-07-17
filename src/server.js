import express from "express";
import configViewEngine from "./config/configViewEngine";
const app = express()
const port = 3001

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