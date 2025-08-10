import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isGithub?: boolean;
  isGoogle?: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function () { return !this.isGoogle && !this.isGithub; } },
  isGoogle: { type: Boolean, default: false },
  isGithub: { type: Boolean, default: false },
});

export default mongoose.model<IUser>('User', userSchema);
