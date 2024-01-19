require('dotenv').config();
const express = require('express');
const expressRateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const Database = require("./config/db");

const recipeRoutes = require('./routes/recipe.route');
const authRoutes = require('./routes/auth.route');
const notFound = require('./middlewares/errorMiddlware');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

const app = express()


// Middlewares
app.use(express.json());

// rate limit middleware
const limiter = expressRateLimit.rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
	legacyHeaders: false,
})

app.use(limiter);


// Session
app.use(cookieParser());


// Connect to DB
const connection = new Database(process.env.MONGODB_URI);
connection.connectDB();


// routes
app.use('/recipes', recipeRoutes);

// authentification
app.use('/api/users/', authRoutes);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Route does not exist
app.use(notFound);

const port = 8000;
app.listen(port, console.log(`Listening on port ${port}`));
