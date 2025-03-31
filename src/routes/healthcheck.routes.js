// IMPORTING MODULES
import { Router } from 'express';
import { healthCheck } from '../controllers/healthcheck.controllers.js';

// CREATING ROUTER INSTANCE
const router = Router();

// DEFINING HEALTH CHECK ROUTE
router.get('/', healthCheck);

// EXPORTING ROUTER
export default router;
