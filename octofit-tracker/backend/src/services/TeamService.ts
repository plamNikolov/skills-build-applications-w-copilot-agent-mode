import Team from '../models/Team.js';
import User from '../models/User.js';

export class TeamService {
  static async createTeam(teamData: { name: string; description?: string; admin: string }) {
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

  static async getTeamById(teamId: string) {
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

  static async addMemberToTeam(teamId: string, userId: string) {
    const user = await User.findById(userId);
    if (!user) {
      throw {
        status: 404,
        message: 'User not found',
      };
    }

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members');

    if (!team) {
      throw {
        status: 404,
        message: 'Team not found',
      };
    }

    return team;
  }

  static async removeMemberFromTeam(teamId: string, userId: string) {
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: userId } },
      { new: true }
    ).populate('members');

    if (!team) {
      throw {
        status: 404,
        message: 'Team not found',
      };
    }

    return team;
  }

  static async getTeamMembers(teamId: string) {
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
