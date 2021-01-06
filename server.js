const express = require ("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const { config } = require("./config.js");
const secretKey = config.WEATHER_APIKEY;

const openWeatherURL = "api.openweathermap.org/data/2.5/weather?q=";
let city = "San Diego";
let state = "CA";
let country = "US";

const elements = [city, state, country];
let cityStateCountry = elements.join();
let fullQuery = openWeatherURL + cityStateCountry + "&appid=" + secretKey;
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
    https.get(fullQuery, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
        })
    })
    res.send("Server running");
})

app.post('/', (req, res) => {
    res.send("result: " + (Number(req.body.num1) + Number(req.body.num2)));
})

app.listen(3000, () => {
    console.log('app listening at http://localhost:3000');
})

