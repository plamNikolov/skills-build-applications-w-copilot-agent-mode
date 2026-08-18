import express from 'express';
import { asyncHandler } from '../middleware/index.js';
import { validateRequest } from '../middleware/validation.js';
import { TeamService } from '../services/TeamService.js';
const router = express.Router();
// Create team
router.post('/', validateRequest([
    { field: 'name', type: 'string', required: true, minLength: 3 },
    { field: 'admin', type: 'string', required: true },
]), asyncHandler(async (req, res) => {
    const team = await TeamService.createTeam(req.body);
    res.status(201).json({ message: 'Team created successfully', team });
}));
// Get all teams
router.get('/', asyncHandler(async (req, res) => {
    const teams = await TeamService.getAllTeams();
    res.json(teams);
}));
// Get team by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const team = await TeamService.getTeamById(req.params.id);
    res.json(team);
}));
// Join team
router.post('/:id/join', validateRequest([{ field: 'userId', type: 'string', required: true }]), asyncHandler(async (req, res) => {
    const team = await TeamService.addMemberToTeam(req.params.id, req.body.userId);
    res.json(team);
}));
// Get team members
router.get('/:id/members', asyncHandler(async (req, res) => {
    const members = await TeamService.getTeamMembers(req.params.id);
    res.json(members);
}));
export default router;
