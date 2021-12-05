import express from 'express';
import cors from 'cors';

import connectDb from './utils/connectDb';

const app = express();

/**
 * Prevent CORS policy blocks
 */
app.use(cors());

/**
 * Enable body parser middleware
 */
app.use(express.json());

/**
 * Connect to database
 */
connectDb();

/**
 * Define route handlers
 */

/**
 * Specify PORT and spin up server
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
