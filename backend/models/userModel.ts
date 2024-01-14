import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    permissions: string[]
}

const userSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: [true, 'First Name field is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name field is required'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender field is required'],
  },
  permissions: {
    type: [String],
    default: [],
  },
},
{
  timestamps: true,
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
