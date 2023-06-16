import { OrderStatus } from '@hg-ticketing/common';
import { ITicketDoc } from './';

export interface IOrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicketDoc;
}
