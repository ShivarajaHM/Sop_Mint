const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit");
var winston = require('winston'),
    expressWinston = require('express-winston');
const dbConfig = require('./config/configurl');
const route = require('./routes');

const app = express()

const port = 3000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message:
    "Too many requests created from this IP, please try again after an hour"
});

app.use(limiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, 
  msg: "HTTP {{req.method}} {{req.url}} {{req.headers}}", 
  expressFormat: true, 
  colorize: false,
  ignoreRoute: function (req, res) { return false; } 
}));
app.use('/', route);


app.use(bodyParser.json());


try {
  mongoose.connect(
    dbConfig.url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})