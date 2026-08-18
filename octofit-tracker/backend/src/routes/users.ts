import express from 'express';
import { asyncHandler } from '../middleware/index.js';
import { validateRequest } from '../middleware/validation.js';
import { UserService } from '../services/UserService.js';

const router = express.Router();

// Register new user
router.post(
  '/register',
  validateRequest([
    { field: 'username', type: 'string', required: true, minLength: 3, maxLength: 30 },
    { field: 'email', type: 'email', required: true },
    { field: 'password', type: 'string', required: true, minLength: 6 },
  ]),
  asyncHandler(async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  })
);

// Get user profile
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await UserService.getUserProfile(req.params.id);
    res.json(user);
  })
);

// Update user profile
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.json(user);
  })
);

// Search users
router.get(
  '/search/:query',
  asyncHandler(async (req, res) => {
    const users = await UserService.searchUsers(req.params.query);
    res.json(users);
  })
);

export default router;
