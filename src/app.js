// Import the Express framework
import express from 'express';
import healthCheckRouter from './routes/healthcheck.routes.js';

// Create an Express application
const app = express();

// Use the health check router for requests to '/api/v1/healthcheck'
app.use('/api/v1/healthcheck', healthCheckRouter);

// Export the app instance for use in other files (e.g., server.js)
export default app;
