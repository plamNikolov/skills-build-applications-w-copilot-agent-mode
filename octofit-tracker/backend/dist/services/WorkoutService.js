import Workout from '../models/Workout.js';
export class WorkoutService {
    static async createWorkout(workoutData) {
        const workout = new Workout(workoutData);
        await workout.save();
        return workout;
    }
    static async getWorkoutById(workoutId) {
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            throw {
                status: 404,
                message: 'Workout not found',
            };
        }
        return workout;
    }
    static async getAllWorkouts() {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        return workouts;
    }
    static async getWorkoutsByDifficulty(difficulty) {
        const workouts = await Workout.find({ difficulty });
        return workouts;
    }
    static async updateWorkout(workoutId, updateData) {
        const workout = await Workout.findByIdAndUpdate(workoutId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!workout) {
            throw {
                status: 404,
                message: 'Workout not found',
            };
        }
        return workout;
    }
    static async deleteWorkout(workoutId) {
        const workout = await Workout.findByIdAndDelete(workoutId);
        if (!workout) {
            throw {
                status: 404,
                message: 'Workout not found',
            };
        }
        return workout;
    }
}
