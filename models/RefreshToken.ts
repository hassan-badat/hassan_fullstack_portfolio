/**
 * Model for handling token refreshes
 */
import mongoose, { Schema, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handle typing
 */
type ObjectId = typeof mongoose.Types.ObjectId;

interface IRefreshToken {
  token: string;
  user: ObjectId;
}

interface IRefreshTokenModel extends Model<IRefreshToken> {
  createToken: (user_id: string | ObjectId) => Promise<string>;
}

/**
 * Define Schema
 */
const RefreshTokenSchema = new Schema<IRefreshToken, IRefreshTokenModel>({
  token: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
});

/**
 * @function createToken
 * @description Remove any old refresh token associated to user and create new one
 * @param user_id
 */

RefreshTokenSchema.statics.createToken = async function (user_id) {
  try {
    // Check to see if refresh token already exists for user
    await this.findOneAndRemove({ user: user_id });

    const _token = uuidv4();

    const _object = new this({
      token: _token,
      user: user_id,
    });

    const refreshToken = await _object.save();

    return refreshToken.token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default mongoose.model<IRefreshToken, IRefreshTokenModel>(
  'refresh_token',
  RefreshTokenSchema
);
