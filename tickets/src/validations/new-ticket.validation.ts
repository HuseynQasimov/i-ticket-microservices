import { body } from 'express-validator';

export const newTicketValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be positive number'),
];
