import mongoose from 'mongoose';
import { IOrderDoc, IOrderAttrs } from './';

export interface IOrderModel extends mongoose.Model<IOrderDoc> {
  build(attrs: IOrderAttrs): IOrderDoc;
}
