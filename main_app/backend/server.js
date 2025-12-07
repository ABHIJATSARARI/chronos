const express = require('express');
const cors = require('cors');
require('dotenv').config();

const simulationRoutes = require('./routes/simulation');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/simulation', simulationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           CHRONOS BACKEND - VULTR COMPUTE                 ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  Server running on: http://localhost:${PORT}               ║`);
  console.log('║  Environment: ' + (process.env.NODE_ENV || 'development').padEnd(43) + '║');
  console.log('║  Raindrop MCP: Ready                                       ║');
  console.log('║  Gemini API: Connected                                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
});

module.exports = app;
