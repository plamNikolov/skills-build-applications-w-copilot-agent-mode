import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import Leaderboard from '../models/Leaderboard.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Workout.deleteMany({});
        await Leaderboard.deleteMany({});
        // Create test users
        const user1 = await User.create({
            username: 'runner_jane',
            email: 'jane@example.com',
            password: 'hashedpassword123',
            profile: {
                firstName: 'Jane',
                lastName: 'Smith',
                bio: 'Marathon runner',
            },
        });
        const user2 = await User.create({
            username: 'cyclist_john',
            email: 'john@example.com',
            password: 'hashedpassword456',
            profile: {
                firstName: 'John',
                lastName: 'Doe',
                bio: 'Road cyclist',
            },
        });
        // Create test teams
        const team1 = await Team.create({
            name: 'Morning Runners',
            description: 'Early morning running group',
            admin: user1._id,
            members: [user1._id, user2._id],
        });
        // Create test activities
        await Activity.create({
            user: user1._id,
            type: 'running',
            duration: 45,
            distance: 7.5,
            calories: 600,
            description: 'Morning run',
        });
        await Activity.create({
            user: user2._id,
            type: 'cycling',
            duration: 60,
            distance: 25,
            calories: 700,
            description: 'Road cycling',
        });
        // Create test workouts
        await Workout.create({
            title: 'Beginner Full Body',
            description: 'A great workout for beginners',
            exercises: [
                { name: 'Push-ups', sets: 3, reps: 10 },
                { name: 'Squats', sets: 3, reps: 15 },
                { name: 'Plank', sets: 3, reps: 30 },
            ],
            difficulty: 'beginner',
            duration: 30,
        });
        // Create leaderboard entries
        await Leaderboard.create({
            user: user1._id,
            team: team1._id,
            score: 1500,
            activitiesCount: 10,
            totalDistance: 75,
            totalDuration: 450,
        });
        await Leaderboard.create({
            user: user2._id,
            team: team1._id,
            score: 1200,
            activitiesCount: 8,
            totalDistance: 200,
            totalDuration: 480,
        });
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
