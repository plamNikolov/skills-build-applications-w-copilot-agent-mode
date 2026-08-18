import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Log activity
router.post('/', async (req, res) => {
  try {
    const { user, type, duration, distance, calories, description } = req.body;

    const activity = new Activity({
      user,
      type,
      duration,
      distance,
      calories,
      description,
    });

    await activity.save();
    res.status(201).json({ message: 'Activity logged successfully', activity });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get user activities
router.get('/user/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user').sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
