import { Publisher, Subjects, ITicketCreatedEvent } from '@hg-ticketing/common';

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
