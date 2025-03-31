import express from 'express';
import healthCheckRouter from './routes/healthcheck.routes';

const app = express();

app.use('/api/v1/healthcheck', healthCheckRouter);

export default app;
