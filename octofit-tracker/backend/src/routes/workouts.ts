import express from 'express';
import { asyncHandler } from '../middleware/index.js';
import { validateRequest } from '../middleware/validation.js';
import { WorkoutService } from '../services/WorkoutService.js';

const router = express.Router();

// Create workout
router.post(
  '/',
  validateRequest([
    { field: 'title', type: 'string', required: true, minLength: 3 },
  ]),
  asyncHandler(async (req, res) => {
    const workout = await WorkoutService.createWorkout(req.body);
    res.status(201).json({ message: 'Workout created successfully', workout });
  })
);

// Get all workouts
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const workouts = await WorkoutService.getAllWorkouts();
    res.json(workouts);
  })
);

// Get workout by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const workout = await WorkoutService.getWorkoutById(req.params.id);
    res.json(workout);
  })
);

// Get workouts by difficulty
router.get(
  '/difficulty/:difficulty',
  asyncHandler(async (req, res) => {
    const workouts = await WorkoutService.getWorkoutsByDifficulty(req.params.difficulty);
    res.json(workouts);
  })
);

// Update workout
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const workout = await WorkoutService.updateWorkout(req.params.id, req.body);
    res.json(workout);
  })
);

// Delete workout
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const workout = await WorkoutService.deleteWorkout(req.params.id);
    res.json({ message: 'Workout deleted successfully', workout });
  })
);

export default router;
