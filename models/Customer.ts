import mongoose, { Schema } from 'mongoose';

type ObjectId = typeof mongoose.Types.ObjectId;

interface ICustomer {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  purchases: ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    first: { type: String },
    last: { type: String },
  },
  email: { type: String },
  password: { type: String },
  purchases: [{ type: mongoose.Types.ObjectId }], // References Transaction Model
});

export default mongoose.model<ICustomer>('customer', CustomerSchema);
