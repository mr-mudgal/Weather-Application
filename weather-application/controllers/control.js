// load dotenv module
require('dotenv').config();

// object with city array, storing the cities asked in the query
let details = {
    cities: []
}
//object with weather object, storing the weathers of the multiple cities in the query
let weathers = {
    'weather' : {}
}
// importing the request module used to call the api
const request = require('request')

// function called when home url is accessed
const home = (req, res) =>  {
    res.render('index', {cities: details.cities, weather: weathers})
}

//function called when getWeather url is accessed
const weatherInfo = async (req, res) => {
    details.cities = req.body.cities.split(',')  // reading multiple cities in a list
    for (let i = 0; i < details.cities.length; i++) {
        requestinfo(i, details, res)  // calling the API function to get the realtime weather
    }
}

const requestinfo = (i, details, res) => {
    // setting up the API
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        qs: {q: details.cities[i]},
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    }

    // calling API using the request module
     request(options, function (error, response, body) {
        let tempW = []
         // throws error if any
         if (error) {
            res.send(error)
        }
         else{
             let temp = JSON.parse(body)
             tempW[`${temp.location.name}`] = String(temp.current.temp_c) + 'C'

             //assigning the result to the weather object to transfer it to the webpage
             Object.assign(weathers.weather, tempW)

             // if all the cities are being called by the API, render the webpage and display the result
             if (i === details.cities.length - 1) {
                 res.render('index', {cities: details.cities, info: weathers.weather})
                 weathers.weather = {} // emptying the variables so that they are clear for the next cities information
                 tempW.length = 0
                 details.cities = []
             }
         }
    })
}


module.exports = {home, weatherInfo}
