import mongoose, { Schema } from 'mongoose';

interface IProduct {
  name: string;
  department: string;
  product_no: string;
  stock: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String },
  department: { type: String },
  product_no: { type: String },
  stock: { type: Number },
});

export default mongoose.model<IProduct>('product', ProductSchema);
