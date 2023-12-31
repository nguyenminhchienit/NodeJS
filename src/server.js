import express from "express";
import configViewEngine from "./config/configViewEngine";
// require('dotenv').config;
import {} from 'dotenv/config' 
import initWebRouter from "./route/web";
import initAPIRouter from "./route/api";
import pool from "./config/connectDB";

const app = express()
const port = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
configViewEngine(app)

//
initWebRouter(app);

//
initAPIRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})