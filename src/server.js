//Require express for initialize the server
const express = require('express');
const app = express()
const path = require('path');

//Morgan shows the http requests on console
const morgan = require('morgan');

//Database
require('./database')

//Settings
app.set('port', 3000 || process.env.PORT)
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

//Routes
app.use(require('./routes/index.routes'))

module.exports = app