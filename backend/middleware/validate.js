import { body } from 'express-validator';

export const signUpValidationRules = () => [
  body('username').notEmpty().withMessage('Username cannot be empty'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const loginValidationRules = () => [
  body('username').notEmpty().withMessage('Username cannot be empty'),
  body('password').notEmpty().withMessage('Password cannot be empty'),
];
