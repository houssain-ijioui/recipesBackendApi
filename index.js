require('dotenv').config();
const express = require('express');
const expressRateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Database = require("./config/db");

const recipeRoutes = require('./routes/recipe.route');
const authRoutes = require('./routes/auth.route');
const notFound = require('./middlewares/errorMiddlware');

const SESSION_SECRET = process.env.SESSION_SECRET;

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



// Session
app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/user-sessions" }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));



// Connect to DB
const connection = new Database(process.env.MONGODB_URI);
connection.connectDB();


// routes
app.use('/recipes', recipeRoutes);

// authentification
app.use('/api/users/', authRoutes);

// Route does not exist
app.use(notFound);

const port = 8000;
app.listen(port, console.log(`Listening on port ${port}`));