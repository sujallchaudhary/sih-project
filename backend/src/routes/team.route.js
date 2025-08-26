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
    updateTeam
} = require('../controllers/team.controller');

router.post('/create', createTeam);
router.put('/update', updateTeam);
router.delete('/delete', deleteTeam);

router.post('/join', joinTeam);
router.post('/leave', leaveTeam);
router.post('/remove', removeUserFromTeam);
router.post('/transfer-leadership', transferLeadership);

router.get('/details', getTeamDetails);

module.exports = router;
