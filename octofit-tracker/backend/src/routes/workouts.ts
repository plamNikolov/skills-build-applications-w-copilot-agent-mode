import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

// Create workout
router.post('/', async (req, res) => {
  try {
    const { title, description, exercises, difficulty, duration } = req.body;

    const workout = new Workout({
      title,
      description,
      exercises,
      difficulty,
      duration,
    });

    await workout.save();
    res.status(201).json({ message: 'Workout created successfully', workout });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
