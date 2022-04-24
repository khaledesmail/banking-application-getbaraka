const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const xss = require('xss-clean');
const { database } = require("./utilities");
const router = require("./api/routes");


app.use(bodyParser.json());

// Database connection
database.connect();

// Data Sanitization against XSS 
app.use(xss());

// application Route
app.use(router);

module.exports = app;
