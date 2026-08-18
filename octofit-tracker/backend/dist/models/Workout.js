import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number,
            weight: String,
        },
    ],
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
    },
    duration: Number,
}, { timestamps: true });
export default mongoose.model('Workout', workoutSchema);
