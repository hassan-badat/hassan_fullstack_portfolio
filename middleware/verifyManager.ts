/**
 * Middleware function to check if user is a product manager
 */

import { Request, Response, NextFunction } from 'express';

import ProductManager from '../models/ProductManager';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const manager = await ProductManager.findById(req.user_id);

    if (!manager)
      return res
        .status(403)
        .send({ message: 'User must be a manager to make this request.' });

    next();
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};
