import User from '../models/User.js';
export class UserService {
    static async createUser(userData) {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }],
        });
        if (existingUser) {
            throw {
                status: 409,
                message: 'Username or email already exists',
            };
        }
        const user = new User(userData);
        await user.save();
        return user;
    }
    static async getUserById(userId) {
        const user = await User.findById(userId).populate('teams');
        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            };
        }
        return user;
    }
    static async updateUser(userId, updateData) {
        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            };
        }
        return user;
    }
    static async getUserProfile(userId) {
        const user = await User.findById(userId)
            .populate('teams')
            .select('-password');
        if (!user) {
            throw {
                status: 404,
                message: 'User profile not found',
            };
        }
        return user;
    }
    static async searchUsers(query) {
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { 'profile.firstName': { $regex: query, $options: 'i' } },
                { 'profile.lastName': { $regex: query, $options: 'i' } },
            ],
        }).select('-password');
        return users;
    }
}
