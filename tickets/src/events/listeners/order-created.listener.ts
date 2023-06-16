import { Message } from 'node-nats-streaming';
import { Listener, IOrderCreatedEvent, Subjects } from '@hg-ticketing/common';
import { queueGroupName } from './';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListener extends Listener<IOrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    msg.ack();
  }
}
