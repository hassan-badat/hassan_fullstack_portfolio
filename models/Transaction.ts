import mongoose, { Schema, Types } from 'mongoose';

type ObjectId = typeof Types.ObjectId;

interface ITransaction {
  products: ObjectId[];
  customer: ObjectId;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  products: [{ type: Types.ObjectId }],
  customer: { type: Types.ObjectId },
  date: { type: Date },
});

export default mongoose.model<ITransaction>('transaction', TransactionSchema);
