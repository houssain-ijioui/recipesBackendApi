require('dotenv').config();
const express = require('express');
const expressRateLimit = require('express-rate-limit');
const Database = require("./config/db");

const recipeRoutes = require('./routes/recipe.route');

const app = express()


// Middlewares
app.use(express.json());

// rate limit middleware
const limiter = expressRateLimit.rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
	legacyHeaders: false,
})

app.use(limiter);



// Connect to DB
const connection = new Database(process.env.MONGODB_URI);
connection.connectDB();


// routes
app.use('/recipes', recipeRoutes);


const port = 8000;
app.listen(port, console.log(`Listening on port ${port}`));