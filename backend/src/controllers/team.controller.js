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

module.exports = {
    createTeam,
    joinTeam,
    leaveTeam,
    removeUserFromTeam,
    deleteTeam
};
