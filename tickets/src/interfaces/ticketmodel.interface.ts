import mongoose from 'mongoose';
import { ITicketDoc, ITicketAttrs } from './';

export interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(attrs: ITicketAttrs): ITicketDoc;
}
