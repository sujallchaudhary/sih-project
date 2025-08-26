const { check } = require('zod/v4');
const Team = require('../models/team.model');
const User = require('../models/user.model');

const createTeam = async(req,res)=>{
    const {name} = req.body;
    const {mongoId} = req.user;
    try {
        const checkIsAlreadyInTeam = await User.findById(mongoId).populate('teamId');
        if(checkIsAlreadyInTeam.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is already in a team',
            });
        }
        const newTeam = await Team.create({name, leaderId: mongoId});
        await User.findByIdAndUpdate(mongoId, {teamId: newTeam._id});
        if(!newTeam){
            return res.status(400).json({
                success: false,
                message: 'Failed to create team',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Team created successfully',
            data: newTeam
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

const joinTeam = async(req,res)=>{
    const {mongoId} = req.user;
    const {teamId} = req.body;
    try {
        const checkUserTeam = await User.findById(mongoId).populate('teamId');
        if(checkUserTeam.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is already in a team',
            });
        }
        const checkTeamExists = await Team.find({_id:teamId,isDeleted:false});
        if(!checkTeamExists){
            return res.status(404).json({
                success: false,
                message: 'Team not found',
            });
        }
        if(checkTeamExists.teamSize >=6){
            return res.status(400).json({
                success: false,
                message: 'Team is full',
            });
        }
        await User.findByIdAndUpdate(mongoId, {teamId: teamId});
        await Team.findByIdAndUpdate(teamId, {$inc: {teamSize: 1}});
        return res.status(200).json({
            success: true,
            message: 'User joined team successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const leaveTeam = async(req,res)=>{
    try {
        const {mongoId} = req.user;
        const checkUserTeam = await User.findById(mongoId).populate('teamId');
        if(!checkUserTeam.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }
        if(checkUserTeam.teamId.leaderId.toString() === mongoId){
            return res.status(400).json({
                success: false,
                message: 'Team leader cannot leave the team. Please delete the team or transfer leadership.',
            });
        }
        await User.findByIdAndUpdate(mongoId, {teamId: null});
        await Team.findByIdAndUpdate(checkUserTeam.teamId, {$inc: {teamSize: -1}});
        return res.status(200).json({
            success: true,
            message: 'User left team successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error: error.message
        });   
    }
};

const removeUserFromTeam = async(req,res)=>{
    const {mongoId} = req.user;
    const {userId} = req.body;
    try {
        const checkUserTeam = await User.findById(userId).populate('teamId');
        if(!checkUserTeam.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }
        const checkLeaderTeam = await User.findById(mongoId).populate('teamId');
        if(checkLeaderTeam.teamId && checkLeaderTeam.teamId.leaderId.toString() === mongoId){
            return res.status(400).json({
                success: false,
                message: 'Team leader cannot remove a user from the team.',
            });
        }
        await User.findByIdAndUpdate(userId, {teamId: null});
        await Team.findByIdAndUpdate(checkUserTeam.teamId, {$inc: {teamSize: -1}});
        return res.status(200).json({
            success: true,
            message: 'User removed from team successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const deleteTeam = async(req,res)=>{
    const {mongoId} = req.user;
    try {
        const checkUserTeam = await User.findById(mongoId).populate('teamId');
        if(!checkUserTeam.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }
        if(checkUserTeam.teamId.leaderId.toString() !== mongoId){
            return res.status(400).json({
                success: false,
                message: 'Only team leader can delete the team',
            });
        }
        await Team.findByIdAndUpdate(checkUserTeam.teamId._id, {isDeleted: true});
        await User.updateMany({teamId: checkUserTeam.teamId._id}, {teamId: null});
        return res.status(200).json({
            success: true,
            message: 'Team deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Internal server error',
            error: error.message
        });
        
    }
}

const getTeamDetails = async(req,res)=>{
    const {mongoId} = req.user;
    try {
        const user = await User.findById(mongoId).populate('teamId');
        if(!user.teamId){
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }

        const team = await Team.findById(user.teamId._id)
            .populate('leaderId', 'name email photoURL createdAt')
            .lean();

        if(!team || team.isDeleted){
            return res.status(404).json({
                success: false,
                message: 'Team not found or has been deleted',
            });
        }
        const teamMembers = await User.find({
            teamId: team._id
        }).select('name email photoURL role createdAt lastLoginAt').lean();
        const teamDetails = {
            id: team._id,
            name: team.name,
            teamSize: team.teamSize,
            maxTeamSize: 6,
            availableSlots: 6 - team.teamSize,
            isTeamFull: team.teamSize >= 6,
            leader: {
                id: team.leaderId._id,
                name: team.leaderId.name,
                email: team.leaderId.email,
                photoURL: team.leaderId.photoURL,
                memberSince: team.leaderId.createdAt
            },
            members: teamMembers.map(member => ({
                id: member._id,
                name: member.name,
                email: member.email,
                photoURL: member.photoURL,
                role: member.role,
                isLeader: member._id.toString() === team.leaderId._id.toString(),
                joinedAt: member.createdAt,
                lastActive: member.lastLoginAt,
                membershipDuration: Math.floor((new Date() - new Date(member.createdAt)) / (1000 * 60 * 60 * 24)) // days
            })),
            createdAt: team.createdAt,
            updatedAt: team.updatedAt
        };

        res.status(200).json({
            success: true,
            message: 'Team details retrieved successfully',
            data: {
                team: teamDetails,
                currentUser: {
                    id: mongoId,
                    isLeader: mongoId === team.leaderId._id.toString(),
                    canManageTeam: mongoId === team.leaderId._id.toString(),
                    membershipStatus: 'active'
                }
            }
        });
    } catch (error) {
        console.error('Get Team Details Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

const transferLeadership = async(req, res) => {
    const { mongoId } = req.user;
    const { newLeaderId } = req.body;

    try {
        const currentUser = await User.findById(mongoId).populate('teamId');
        
        if (!currentUser.teamId) {
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }
        if (currentUser.teamId.leaderId.toString() !== mongoId) {
            return res.status(403).json({
                success: false,
                message: 'Only team leader can transfer leadership',
            });
        }
        const newLeader = await User.findById(newLeaderId);
        if (!newLeader || newLeader.teamId?.toString() !== currentUser.teamId._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'New leader must be a member of the same team',
            });
        }

        await Team.findByIdAndUpdate(currentUser.teamId._id, {
            leaderId: newLeaderId
        });

        res.status(200).json({
            success: true,
            message: 'Leadership transferred successfully',
            data: {
                newLeader: {
                    id: newLeader._id,
                    name: newLeader.name,
                    email: newLeader.email
                }
            }
        });

    } catch (error) {
        console.error('Transfer Leadership Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const updateTeam = async(req, res) => {
    const { mongoId } = req.user;
    const { name } = req.body;

    try {
        const user = await User.findById(mongoId).populate('teamId');
        
        if (!user.teamId) {
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }

        if (user.teamId.leaderId.toString() !== mongoId) {
            return res.status(403).json({
                success: false,
                message: 'Only team leader can update team information',
            });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            user.teamId._id,
            { name },
            { new: true }
        ).populate('leaderId', 'name email photoURL');

        res.status(200).json({
            success: true,
            message: 'Team updated successfully',
            data: {
                team: {
                    id: updatedTeam._id,
                    name: updatedTeam.name,
                    leader: updatedTeam.leaderId,
                    updatedAt: updatedTeam.updatedAt
                }
            }
        });

    } catch (error) {
        console.error('Update Team Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createTeam,
    joinTeam,
    leaveTeam,
    removeUserFromTeam,
    deleteTeam,
    getTeamDetails,
    transferLeadership,
    updateTeam
};
