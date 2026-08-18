import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
export class ActivityService {
    static async logActivity(activityData) {
        const activity = new Activity(activityData);
        await activity.save();
        // Update leaderboard
        await this.updateLeaderboardStats(activityData.user);
        return activity.populate('user');
    }
    static async getUserActivities(userId, limit = 50) {
        const activities = await Activity.find({ user: userId })
            .populate('user')
            .sort({ createdAt: -1 })
            .limit(limit);
        return activities;
    }
    static async getAllActivities(limit = 100) {
        const activities = await Activity.find()
            .populate('user')
            .sort({ createdAt: -1 })
            .limit(limit);
        return activities;
    }
    static async getActivitiesByType(type) {
        const activities = await Activity.find({ type })
            .populate('user')
            .sort({ createdAt: -1 });
        return activities;
    }
    static async getActivityStats(userId) {
        const stats = await Activity.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: null,
                    totalActivities: { $sum: 1 },
                    totalDuration: { $sum: '$duration' },
                    totalDistance: { $sum: { $ifNull: ['$distance', 0] } },
                    totalCalories: { $sum: { $ifNull: ['$calories', 0] } },
                    avgDuration: { $avg: '$duration' },
                },
            },
        ]);
        return stats[0] || {
            totalActivities: 0,
            totalDuration: 0,
            totalDistance: 0,
            totalCalories: 0,
            avgDuration: 0,
        };
    }
    static async updateLeaderboardStats(userId) {
        const stats = await this.getActivityStats(userId);
        await Leaderboard.findOneAndUpdate({ user: userId }, {
            activitiesCount: stats.totalActivities,
            totalDistance: stats.totalDistance,
            totalDuration: stats.totalDuration,
            score: stats.totalActivities * 100 + stats.totalDistance * 10,
        }, { upsert: true });
    }
}
