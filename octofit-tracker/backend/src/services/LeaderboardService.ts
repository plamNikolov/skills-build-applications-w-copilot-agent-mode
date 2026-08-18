import Leaderboard from '../models/Leaderboard.js';

export class LeaderboardService {
  static async getGlobalLeaderboard(limit = 50) {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'username profile')
      .sort({ score: -1 })
      .limit(limit);

    return leaderboard;
  }

  static async getTeamLeaderboard(teamId: string, limit = 50) {
    const leaderboard = await Leaderboard.find({ team: teamId })
      .populate('user', 'username profile')
      .sort({ score: -1 })
      .limit(limit);

    return leaderboard;
  }

  static async getUserRank(userId: string) {
    const userEntry = await Leaderboard.findOne({ user: userId });

    if (!userEntry) {
      throw {
        status: 404,
        message: 'User leaderboard entry not found',
      };
    }

    const rank = await Leaderboard.countDocuments({
      score: { $gt: userEntry.score },
    });

    return {
      rank: rank + 1,
      entry: userEntry,
    };
  }

  static async getTeamRanking(teamId: string) {
    const teamScores = await Leaderboard.aggregate([
      { $match: { team: teamId } },
      {
        $group: {
          _id: '$team',
          totalScore: { $sum: '$score' },
          memberCount: { $sum: 1 },
          avgScore: { $avg: '$score' },
        },
      },
    ]);

    return teamScores[0] || {
      totalScore: 0,
      memberCount: 0,
      avgScore: 0,
    };
  }
}
