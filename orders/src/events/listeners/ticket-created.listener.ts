import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ITicketCreatedEvent } from '@hg-ticketing/common';
import { queueGroupName } from './';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
