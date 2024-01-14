import express from 'express';
import {
  registerUser,
  loginUser,
  editUser
  
} from '../controllers/userController';
import { protectMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/edit', protectMiddleware, editUser);

export default router;
