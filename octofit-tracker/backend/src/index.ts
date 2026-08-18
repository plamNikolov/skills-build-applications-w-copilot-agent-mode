import express from 'express';
import db from './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import workoutsRouter from './routes/workouts.js';
import leaderboardRouter from './routes/leaderboard.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Octofit Tracker API is running' });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Octofit Tracker API running on port ${PORT}`);
});
