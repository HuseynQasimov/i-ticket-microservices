import { NotFoundError, requireAuth } from '@hg-ticketing/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (!order || order.userId !== req.currentUser!.id) {
      throw new NotFoundError();
    }

    res.status(200).send(order);
  }
);

export { router as getOrderRouter };
