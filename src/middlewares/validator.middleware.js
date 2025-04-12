import { validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error.js';
export const validate = function (req, res, next) {
  const errors = validationResult(req);
  console.log('😒', typeof errors, '😒', errors);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedError = [];
  errors.array().map(function (error) {
    extractedError.push({
      [error.path]: error.msg,
    });
  });
  throw new ApiError(422, 'Received data is not valid ', extractedError);
};
