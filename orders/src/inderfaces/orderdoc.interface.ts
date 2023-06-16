import { OrderStatus } from '@hg-ticketing/common';
import mongoose from 'mongoose';
import { ITicketDoc } from './';

export interface IOrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicketDoc;
}
