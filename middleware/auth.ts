/**
 * Middleware function to verify that customer is authenticated
 */

import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.header('x-access-token');

  if (!token) return res.status(403).send({ message: 'Missing auth token.' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //@ts-ignore
    req.user_id = decoded.user_id;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // Auth token has expired
      return res.status(403).send({ message: 'Auth token has expired.' });
    }

    return res.status(403).send({ message: 'Invalid auth token.' });
  }
};
