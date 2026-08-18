import Team from '../models/Team.js';
import User from '../models/User.js';
export class TeamService {
    static async createTeam(teamData) {
        const admin = await User.findById(teamData.admin);
        if (!admin) {
            throw {
                status: 404,
                message: 'Admin user not found',
            };
        }
        const team = new Team({
            ...teamData,
            members: [teamData.admin],
        });
        await team.save();
        await team.populate(['members', 'admin']);
        return team;
    }
    static async getTeamById(teamId) {
        const team = await Team.findById(teamId)
            .populate('members')
            .populate('admin');
        if (!team) {
            throw {
                status: 404,
                message: 'Team not found',
            };
        }
        return team;
    }
    static async getAllTeams() {
        const teams = await Team.find()
            .populate('members')
            .populate('admin');
        return teams;
    }
    static async addMemberToTeam(teamId, userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            };
        }
        const team = await Team.findByIdAndUpdate(teamId, { $addToSet: { members: userId } }, { new: true }).populate('members');
        if (!team) {
            throw {
                status: 404,
                message: 'Team not found',
            };
        }
        return team;
    }
    static async removeMemberFromTeam(teamId, userId) {
        const team = await Team.findByIdAndUpdate(teamId, { $pull: { members: userId } }, { new: true }).populate('members');
        if (!team) {
            throw {
                status: 404,
                message: 'Team not found',
            };
        }
        return team;
    }
    static async getTeamMembers(teamId) {
        const team = await Team.findById(teamId).populate('members');
        if (!team) {
            throw {
                status: 404,
                message: 'Team not found',
            };
        }
        return team.members;
    }
}
