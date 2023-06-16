import Queue from 'bull';
import { IPayload } from '../interfaces/payload.interface';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete.publisher';
import { natsWrapper } from '../nats-wrapper';

const expirationQueue = new Queue<IPayload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
