import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@hg-ticketing/common';
import {
  createTicketRouter,
  getAllTicketsRouter,
  getTicketRouter,
  updateTicketRouter,
} from './routes';
import { natsWrapper } from './nats-wrapper';
import {
  OrderCancelledListener,
  OrderCreatedListener,
} from './events/listeners';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(getAllTicketsRouter);
app.use(getTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    console.error('JWT_KEY must be defined');
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI must be defined');
    throw new Error('MONGO_URI must be defined');
  }
  if (
    !process.env.NATS_CLUSTER_ID ||
    !process.env.NATS_CLIENT_ID ||
    !process.env.NATS_URL
  ) {
    console.error('Some of NATS configurations are not defined');
    throw new Error('NATS configuration is not defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000..');
  });
};

startUp();
