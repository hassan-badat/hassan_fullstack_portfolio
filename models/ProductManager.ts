import mongoose, { Schema } from 'mongoose';

interface IProductManager {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  employee_no: string;
  role: string;
}

const ProductManagerSchema = new Schema<IProductManager>({
  name: {
    first: { type: String },
    last: { type: String },
  },
  email: { type: String },
  password: { type: String },
  employee_no: { type: String },
  role: { type: String },
});

export default mongoose.model<IProductManager>(
  'product_manager',
  ProductManagerSchema
);
