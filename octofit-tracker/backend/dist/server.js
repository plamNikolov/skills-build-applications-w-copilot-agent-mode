import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import { config } from './config/environment.js';
import { errorHandler, notFoundHandler, requestLogger, corsOptions, } from './middleware/index.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import workoutsRouter from './routes/workouts.js';
import leaderboardRouter from './routes/leaderboard.js';
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Octofit Tracker API is running',
        timestamp: new Date().toISOString(),
        baseUrl: config.baseUrl,
    });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use(notFoundHandler);
app.use(errorHandler);
const PORT = config.port;
export async function start() {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`🐙 Octofit Tracker API running on ${config.baseUrl}`);
            console.log(`Environment: ${config.nodeEnv}`);
            console.log(`Database: ${config.mongoDbUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
if (process.argv[1]?.includes('server.ts')) {
    start();
}
export { app };
