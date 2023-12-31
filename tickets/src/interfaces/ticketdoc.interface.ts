import mongoose from 'mongoose';

export interface ITicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  orderId?: string;
}
