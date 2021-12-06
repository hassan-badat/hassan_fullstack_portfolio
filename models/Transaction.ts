import mongoose, { Schema, Types } from 'mongoose';

type ObjectId = typeof Types.ObjectId;

interface ITransaction {
  product: ObjectId;
  customer: ObjectId;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  product: { type: Types.ObjectId },
  customer: { type: Types.ObjectId },
  date: { type: Date },
});

export default mongoose.model<ITransaction>('transaction', TransactionSchema);
