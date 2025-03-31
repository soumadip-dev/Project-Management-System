// IMPORTING MODULES
import { Router } from 'express';
import { registerUser } from '../controllers/auth.controllers.js';
import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationValidator } from '../validators/index.js';

// CREATING ROUTER INSTANCE
const router = Router();

// DEFINING USER REGISTRATION ROUTE (FACTORY PATTERN)
router.post('/register', userRegistrationValidator(), validate, registerUser);

// EXPORTING ROUTER
export default router;
