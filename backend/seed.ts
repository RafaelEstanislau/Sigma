import mongoose from 'mongoose';
import UserModel from './models/userModel'; 
import connectDb from './config/db'; 
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
dotenv.config();

const initializeUsersWithPermissions = async () => {
    try {
      await connectDb();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("EditEmailEditName", salt);
      // Users sample data with different permissions
      const usersWithPermissions = [
        {
          firstName: 'EditEmailEditName',
          lastName: 'One',
          email: 'EditEmailEditName@example.com',
          password: hashedPassword,
          gender: 'M',
          permissions: ['user:profile:email:edit', 'user:profile:firstname:edit'],
        },
        
        //Possible permissions:
        // "user:profile:view",
        // "user:profile:firstname:view",
        // "user:profile:email:view",
        // "user:profile:firstname:edit",
        // "user:profile:email:edit"

        // Add more users as you wish, just fill the password field at the hashedPassword const to hash the password to the database correctly, e.g: 
        // const hashedPassword = await bcrypt.hash("example", salt);
        // {
        //   firstName: 'User5',
        //   lastName: 'One',
        //   email: 'user5@example.com',
        //   password: hashedPassword,
        //   gender: 'M',
        //   permissions: ['user:profile:firstname:view'],
        // },
      ];
  
      await UserModel.create(usersWithPermissions);
  
      console.log('Users successfully created.');
    } catch (error: any) {
      console.error(`Error while creating users: ${error.message}`);
    } finally {
      mongoose.disconnect();
    }
  };
  initializeUsersWithPermissions();