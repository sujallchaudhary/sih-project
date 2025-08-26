const express = require('express');
const router = express.Router();

const { 
    createTeam,
    joinTeam,
    leaveTeam,
    removeUserFromTeam,
    deleteTeam,
    getTeamDetails,
    transferLeadership,
    updateTeam,
    getTeamInfo
} = require('../controllers/team.controller');

const { authenticateFirebaseToken } = require('../middlewares/jwtAuth');

router.post('/create', authenticateFirebaseToken, createTeam);
router.put('/update', authenticateFirebaseToken, updateTeam);
router.delete('/delete', authenticateFirebaseToken, deleteTeam);

router.post('/join', authenticateFirebaseToken, joinTeam);
router.delete('/leave', authenticateFirebaseToken, leaveTeam);
router.delete('/remove-user', authenticateFirebaseToken, removeUserFromTeam);
router.post('/transfer-leadership', authenticateFirebaseToken, transferLeadership);

router.get('/details', authenticateFirebaseToken, getTeamDetails);
router.get('/info/:teamId', getTeamInfo); // Public endpoint for basic team info

module.exports = router;
