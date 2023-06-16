import {
  Subjects,
  Publisher,
  IOrderCancelledEvent,
} from '@hg-ticketing/common';

export class OrderCancelledPublisher extends Publisher<IOrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
