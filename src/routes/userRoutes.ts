import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/users/:username', UserController.createUser);
router.get('/users/search', UserController.searchUsers);
router.delete('/users/:username', UserController.softDeleteUser);
router.get('/users/sorted', UserController.sortUsers);

export default router;
