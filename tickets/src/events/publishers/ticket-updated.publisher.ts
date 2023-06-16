import { Publisher, Subjects, ITicketUpdatedEvent } from '@hg-ticketing/common';

export class TicketUpdatedPublisher extends Publisher<ITicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
