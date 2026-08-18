import express from 'express';
import { asyncHandler } from '../middleware/index.js';
import { validateRequest } from '../middleware/validation.js';
import { ActivityService } from '../services/ActivityService.js';

const router = express.Router();

// Log activity
router.post(
  '/',
  validateRequest([
    { field: 'user', type: 'string', required: true },
    { field: 'type', type: 'string', required: true },
    { field: 'duration', type: 'number', required: true, min: 1 },
  ]),
  asyncHandler(async (req, res) => {
    const activity = await ActivityService.logActivity(req.body);
    res.status(201).json({ message: 'Activity logged successfully', activity });
  })
);

// Get user activities
router.get(
  '/user/:userId',
  asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const activities = await ActivityService.getUserActivities(req.params.userId, limit);
    res.json(activities);
  })
);

// Get all activities
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
    const activities = await ActivityService.getAllActivities(limit);
    res.json(activities);
  })
);

// Get activities by type
router.get(
  '/type/:type',
  asyncHandler(async (req, res) => {
    const activities = await ActivityService.getActivitiesByType(req.params.type);
    res.json(activities);
  })
);

// Get user activity stats
router.get(
  '/stats/:userId',
  asyncHandler(async (req, res) => {
    const stats = await ActivityService.getActivityStats(req.params.userId);
    res.json(stats);
  })
);

export default router;
