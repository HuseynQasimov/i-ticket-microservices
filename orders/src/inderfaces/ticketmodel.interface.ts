import mongoose from 'mongoose';
import { ITicketAttrs, ITicketDoc } from './';

export interface ITicketModel extends mongoose.Model<ITicketDoc> {
  build(attrs: ITicketAttrs): ITicketDoc;
}
