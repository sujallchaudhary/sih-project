const express = require('express');
const router = express.Router();
const {
    getAllProblemStatements,
    getProblemStatementById,
    getFilterOptions,
    bookMarkPS,
    deleteBookMark,
    addPsToTeam,
    deletePsFromTeam,
    getTeamProblemStatements,
    getBookmarkedProblemStatements
} = require('../controllers/ps.controller');
const {authenticateFirebaseToken, optionalAuthenticateFirebaseToken} = require('../middlewares/jwtAuth');

router.get('/', optionalAuthenticateFirebaseToken, getAllProblemStatements);
router.get('/filters', getFilterOptions);
router.get('/bookmarked', authenticateFirebaseToken, getBookmarkedProblemStatements);
router.get('/team', authenticateFirebaseToken, getTeamProblemStatements);
router.get('/:id', optionalAuthenticateFirebaseToken, getProblemStatementById);

router.post('/bookmark', authenticateFirebaseToken, bookMarkPS);
router.delete('/bookmark', authenticateFirebaseToken, deleteBookMark);
router.post('/team', authenticateFirebaseToken, addPsToTeam);
router.delete('/team', authenticateFirebaseToken, deletePsFromTeam);

module.exports = router;
