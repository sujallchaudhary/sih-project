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

const { authenticateJWT } = require('../middlewares/jwtAuth');

// All team routes require JWT authentication except public team info
router.post('/create', authenticateJWT, createTeam);
router.put('/update', authenticateJWT, updateTeam);
router.delete('/delete', authenticateJWT, deleteTeam);

router.post('/join', authenticateJWT, joinTeam);
router.delete('/leave', authenticateJWT, leaveTeam);
router.delete('/remove-user', authenticateJWT, removeUserFromTeam);
router.post('/transfer-leadership', authenticateJWT, transferLeadership);

router.get('/details', authenticateJWT, getTeamDetails);
router.get('/info/:teamId', getTeamInfo); // Public endpoint for basic team info

module.exports = router;
