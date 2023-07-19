import express from "express";
import configViewEngine from "./config/configViewEngine";
// require('dotenv').config;
import {} from 'dotenv/config' 
import initWebRouter from "./route/web";
import pool from "./config/connectDB";

const app = express()
const port = process.env.PORT || 8080
console.log(port)

//
configViewEngine(app)

//
initWebRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})