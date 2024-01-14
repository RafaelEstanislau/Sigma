import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { UserData, UserResponse } from "../../frontend/src/features/auth/interface";
import mongoose from "mongoose";



const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const registerUser = asyncHandler(async (req: Request<{}, {}, UserData>, res: Response<UserResponse>) => {
  const { firstName, lastName, email, password, gender, permissions } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    gender,
    permissions
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.firstName,
    email: user.email,
    gender: user.gender,
    token: generateToken(user._id),
    permissions: user.permissions
  });
});

export const loginUser = asyncHandler(async (req: Request<{}, {}, UserData>, res: Response<UserResponse>) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.firstName,
    email: user.email,
    gender: user.gender,
    token: generateToken(user._id),
    permissions: user.permissions
  });
});

export const editUser = asyncHandler(async (req: Request<{ userId: string }, {}, Partial<UserData>>, res: Response<UserResponse>) => {
  
  const userId = req.query.userId;
  const updatedUserData = req.body;
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   res.status(400);
  //   throw new Error('Invalid user ID');
  // }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    
    throw new Error('User not found');
  }
  if (updatedUserData.firstName) {
    user.firstName = updatedUserData.firstName;
  }

  if (updatedUserData.lastName) {
    user.lastName = updatedUserData.lastName;
  }

  if (updatedUserData.email) {
    user.email = updatedUserData.email;
  }

  if (updatedUserData.gender) {
    user.gender = updatedUserData.gender;
  }

  await user.save();
  const newToken = generateToken(user._id);

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    gender: user.gender,
    permissions: user.permissions,
    token: newToken
    
  });
});


// const getMe = asyncHandler(async (req: any, res: Response<UserResponse>) => {
//   const user = {
//     id: req.user?._id,
//     email: req.user?.email,
//     name: req.user?.name,
//   };
//   res.status(200).json(user);
// });

// export default {
//   registerUser,
//   loginUser,
// //   getMe,
// };
