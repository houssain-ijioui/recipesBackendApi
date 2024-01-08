require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express()


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Connect to DB
mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("Connected To DB"))
    .catch((err) => console.log(err));


// routes
app.use('/recipes', routes);


const port = 8000
app.listen(port, console.log(`Listening on port ${port}`));