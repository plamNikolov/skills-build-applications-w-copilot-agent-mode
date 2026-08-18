import express from 'express';
import Team from '../models/Team.js';
const router = express.Router();
// Create team
router.post('/', async (req, res) => {
    try {
        const { name, description, admin } = req.body;
        const team = new Team({
            name,
            description,
            admin,
            members: [admin],
        });
        await team.save();
        res.status(201).json({ message: 'Team created successfully', team });
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('members').populate('admin');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id)
            .populate('members')
            .populate('admin');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// Join team
router.post('/:id/join', async (req, res) => {
    try {
        const { userId } = req.body;
        const team = await Team.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } }, { new: true });
        res.json(team);
    }
    catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
export default router;
