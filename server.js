const express = require ("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const url = 
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    res.send("result: " + (Number(req.body.num1) + Number(req.body.num2)));
})

app.listen(3000, () => {
    console.log('app listening at http://localhost:3000');
})