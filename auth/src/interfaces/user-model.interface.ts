import mongoose from 'mongoose';
import { IUserAttrs, IUserDoc } from './';

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}
