/**
 * Function to connect API to MongoDB
 */

import mongoose from 'mongoose';
import config from 'config';

export default async () => {
  try {
    await mongoose.connect(config.get('mongoURI'));
    console.log('Connected to database');
  } catch (error) {
    // Error connecting to database
    console.error(error);
    process.exit(1);
  }
};
