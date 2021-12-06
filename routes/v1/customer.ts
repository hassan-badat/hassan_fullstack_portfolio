import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';

import auth from '../../middleware/auth';

import Customer from '../../models/Customer';
import RefreshToken from '../../models/RefreshToken';

const router = express.Router();

/**
 * Get All Customers
 */
router.get('/', async (req, res) => {
  const { skip } = req.query;

  try {
    const customers = await Customer.find()
      // @ts-ignore
      .skip(skip || 0)
      .limit(10);

    res.json(customers);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Get customer
 */
router.get('/:customer_id', async (req, res) => {
  try {
    const customer = await Customer.aggregate([
      {
        $lookup: {
          from: 'transaction',
          localField: 'purchases',
          foreignField: '_id',
          as: 'purchases',
        },
      },
    ]);

    if (!customer[0])
      return res.status(404).send({ message: 'Customer not found.' });

    res.json(customer[0]);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Login as customer
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer)
      return res.status(403).send({ message: 'Invalid credentials' });

    if (!bcrypt.compareSync(password, customer.password))
      return res.status(403).send({ message: 'Invalid credentials' });

    const accessToken = jwt.sign(
      { user_id: customer._id },
      config.get('jwtSecret')
    );
    const refreshToken = await RefreshToken.createToken(customer._id);

    res.json({ accessToken, refreshToken, customer });
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Register as customer
 */
router.post('/register', async (req, res) => {
  const { customer } = req.body;

  try {
    const existing = await customer.findOne({ email: customer.email });
    if (existing)
      return res
        .status(401)
        .send({ message: 'Email is already in use by customer' });

    const hashed = bcrypt.hashSync(customer.password, 8);

    const newCustomer = new Customer({
      email: customer.email,
      password: hashed,
      name: customer.name,
      purchases: [],
    });

    await newCustomer.save();
    res.json(newCustomer);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Update customer info
 */
router.patch('/', auth, async (req, res) => {
  const { customer } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.user_id,
      { $set: { customer } },
      { new: true, overwrite: true }
    );

    res.json(updatedCustomer);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Delete customer account
 */
router.delete('/', auth, async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(req.user_id);

    res.json(deletedCustomer);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

export default router;
