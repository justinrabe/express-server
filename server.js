const express = require ("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

const { config } = require("./config.js");
const { allowedNodeEnvironmentFlags } = require("process");

const secretKey = config.WEATHER_APIKEY;

const openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";


app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    console.log(req.body);
    let city = req.body.cityName;
    let fullQuery = openWeatherURL + city + "&appid=" + secretKey;
    console.log(fullQuery);
    https.get(fullQuery, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temperature = Math.floor(weatherData.main.temp - 273.15);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The weather is currently " + description +"<p>");
            res.write("<h1>The temperature in " + city + " is " + temperature + " degrees. </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(3000, () => {
    console.log('app listening at http://localhost:3000');
})

/*
 
*/