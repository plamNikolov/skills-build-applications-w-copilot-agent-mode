import express from 'express';
import { asyncHandler } from '../middleware/index.js';
import { LeaderboardService } from '../services/LeaderboardService.js';
const router = express.Router();
// Get global leaderboard
router.get('/', asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    const leaderboard = await LeaderboardService.getGlobalLeaderboard(limit);
    res.json(leaderboard);
}));
// Get team leaderboard
router.get('/team/:teamId', asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    const leaderboard = await LeaderboardService.getTeamLeaderboard(req.params.teamId, limit);
    res.json(leaderboard);
}));
// Get user rank
router.get('/user/:userId/rank', asyncHandler(async (req, res) => {
    const rank = await LeaderboardService.getUserRank(req.params.userId);
    res.json(rank);
}));
// Get team ranking stats
router.get('/team/:teamId/stats', asyncHandler(async (req, res) => {
    const stats = await LeaderboardService.getTeamRanking(req.params.teamId);
    res.json(stats);
}));
export default router;
