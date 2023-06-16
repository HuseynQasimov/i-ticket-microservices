import { body } from 'express-validator';
import mongoose from 'mongoose';

export const createOrderValidation = [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided'),
];
