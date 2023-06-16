import { Publisher, IOrderCreatedEvent, Subjects } from '@hg-ticketing/common';

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
