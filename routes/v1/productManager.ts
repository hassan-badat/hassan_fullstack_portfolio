import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import auth from '../../middleware/auth';
import verifyManager from '../../middleware/verifyManager';

import ProductManager from '../../models/ProductManager';
import RefreshToken from '../../models/RefreshToken';

const router = express.Router();

/**
 * Get all product managers
 */
router.get('/', auth, async (req, res) => {
  const { skip } = req.query;
  try {
    const managers = await ProductManager.find()
      // @ts-ignore
      .skip(parseInt(skip) || 0)
      .limit(10);

    res.json(managers);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Get one product manager
 */
router.get('/:manager_id', async (req, res) => {
  try {
    const manager = await ProductManager.findById(req.params.manager_id);

    if (!manager)
      return res.status(404).send({ message: 'Manager does not exist.' });

    res.json(manager);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Login as a manager
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const manager = await ProductManager.findOne({ email });
    if (!manager)
      return res.status(403).send({ message: 'Invalid credentials.' });

    if (!bcrypt.compareSync(password, manager.password))
      return res.status(403).send({ message: 'Invalid credentials.' });

    const accessToken = jwt.sign(
      { user_id: manager._id },
      config.get('jwtSecret'),
      { expiresIn: 3600 }
    );

    const refreshToken = await RefreshToken.createToken(manager._id);

    res.json({ accessToken, refreshToken, manager });
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Register a product manager
 */
router.post('/', [auth, verifyManager], async (req: Request, res: Response) => {
  const { manager } = req.body;

  try {
    // Make sure email doesn't exist
    const existing = await ProductManager.findOne({ email: manager.email });
    if (existing)
      return res
        .status(401)
        .send({ message: 'A manager with that email already exists.' });

    const hashed = bcrypt.hashSync(manager.password, 8);

    const newManager = new ProductManager({
      email: manager.email,
      password: hashed,
      name: manager.name,
      role: manager.role,
      employee_no: manager.employee_no,
    });

    await newManager.save();
    res.json(newManager);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Update product manager
 */
router.patch('/:manager_id', auth, async (req, res) => {
  const { manager } = req.body;
  try {
    const updatedManager = await ProductManager.findByIdAndUpdate(
      req.user_id,
      {
        $set: { manager },
      },
      { new: true, overwrite: true }
    );

    res.json(updatedManager);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
});

/**
 * Delete a product manager
 */
router.delete(
  '/:manager_id',
  [auth, verifyManager],
  async (req: Request, res: Response) => {
    try {
      const deletedManager = await ProductManager.findByIdAndRemove(
        req.params.manager_id
      );

      res.json(deletedManager);
    } catch (error) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  }
);

export default router;
