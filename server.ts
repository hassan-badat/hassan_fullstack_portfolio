import express from 'express';
import cors from 'cors';

import connectDb from './utils/connectDb';

import productManagerRoutesv1 from './routes/v1/productManager';
import customerRoutesv1 from './routes/v1/customer';

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
app.use('/api/v1/product_manager', productManagerRoutesv1);
app.use('/api/v1/customer', customerRoutesv1);

/**
 * Specify PORT and spin up server
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
