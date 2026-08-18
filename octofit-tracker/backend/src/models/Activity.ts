import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'workout', 'walking'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: Number,
    calories: Number,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model('Activity', activitySchema);
