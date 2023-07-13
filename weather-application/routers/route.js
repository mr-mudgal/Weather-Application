// defining the routes for the home and getWeather url, also importing the functions from controllers

const express = require('express')
const route = express.Router()
const {home, weatherInfo} = require('../controllers/control')

route.get('/', (req, res) => {
    home(req, res)
})

route.post('/getWeather', (req, res) => {
    if(req.body.cities === ''){
        res.redirect('/')
    }else {
        weatherInfo(req, res)
    }
})

module.exports = route
