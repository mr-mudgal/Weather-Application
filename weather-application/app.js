const express = require('express')
const router = require('./routers/route')
const bodyParser = require('body-parser');
const pug = require('pug')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'pug')
app.use(express.static('./views'))
app.use('/', router)
app.listen(5566)
