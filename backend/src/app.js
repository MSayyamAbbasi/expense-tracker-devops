require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./config/env');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security headers
app.use(helmet());

// CORS - allow the configured frontend origin with credentials
app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Request logging
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// API routes
app.use('/api', routes);

// Root health check
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Expense Tracker API is running' });
});

// 404 handler for unmatched routes
app.use(notFound);

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
