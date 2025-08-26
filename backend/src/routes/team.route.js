const express = require('express');
const router = express.Router();

const { createTeam,joinTeam,leaveTeam,removeUserFromTeam,deleteTeam} = require('../controllers/team.controller');

router.post('/create', createTeam);
router.post('/join', joinTeam);
router.post('/leave', leaveTeam);
router.post('/remove', removeUserFromTeam);
router.post('/delete', deleteTeam);

module.exports = router;
