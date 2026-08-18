import express from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = express.Router();

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ score: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get team leaderboard
router.get('/team/:teamId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId })
      .populate('user')
      .sort({ score: -1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Update user leaderboard stats
router.put('/:userId', async (req, res) => {
  try {
    const { score, activitiesCount, totalDistance, totalDuration } = req.body;
    const entry = await Leaderboard.findOneAndUpdate(
      { user: req.params.userId },
      { score, activitiesCount, totalDistance, totalDuration },
      { new: true, upsert: true }
    );
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
