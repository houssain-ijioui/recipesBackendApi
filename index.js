require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressRateLimit = require('express-rate-limit');

const routes = require('./routes');

const app = express()


// Middlewares
app.use(express.json());

// rate limit middleware
const limiter = expressRateLimit.rateLimit({
    windowMs: 60 * 1000,
    limit: 2,
    standardHeaders: 'draft-7',
	legacyHeaders: false,
})

app.use(limiter);



// Connect to DB
mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("Connected To DB"))
    .catch((err) => console.log(err));


// routes
app.use('/recipes', routes);


const port = 8000
app.listen(port, console.log(`Listening on port ${port}`));