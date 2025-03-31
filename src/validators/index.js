// IMPORTING MODULES
import { body } from 'express-validator';
import { isStrongPassword } from './password-validator.js';

// USER REGISTRATION VALIDATOR
const userRegistrationValidator = function () {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .isLength({ max: 20 })
      .withMessage('Username must not exceed 20 characters'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .custom(isStrongPassword) // Strong password validation
      .withMessage(
        'Password must be 8-20 characters long, include uppercase, lowercase, number, special character, and no spaces',
      )
      .not()
      .matches(/\s/)
      .withMessage('Password must not contain spaces'),

    body('role')
      .trim()
      .notEmpty()
      .withMessage('Role is required')
      .isIn(['admin', 'user'])
      .withMessage('Role must be either "admin" or "user"'),
  ];
};

// USER LOGIN VALIDATOR
const userLoginValidator = function () {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .isLength({ max: 20 })
      .withMessage('Password must not exceed 20 characters')
      .not()
      .matches(/\s/)
      .withMessage('Password must not contain spaces'),
  ];
};

// EXPORING THE VALIDATORS
export { userLoginValidator, userRegistrationValidator };
