import express from 'express';
import { Types as MongooseTypes } from 'mongoose';

import auth from '../../middleware/auth';

import Transaction from '../../models/Transaction';
import Customer from '../../models/Customer';

const router = express.Router();

/**
 * Get users purchases
 */
router.get('/', auth, (req, res) => {
  try {
    const purchases = Transaction.aggregate([
      {
        $match: { customer: new MongooseTypes.ObjectId(req.user_id) },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products',
          foreignField: '_id',
          as: 'products',
        },
      },
    ]);

    res.json(purchases);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Create transaction
 */
router.post('/', auth, async (req, res) => {
  const { products } = req.body;

  try {
    const newPurchase = new Transaction({
      customer: req.user_id,
      products: products,
      date: new Date(),
    });

    res.json(newPurchase);

    await Customer.findByIdAndUpdate(req.user_id, {
      $push: { purchases: newPurchase._id },
    });
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

export default router;
