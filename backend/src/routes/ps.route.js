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
const {authenticateJWT, optionalAuthenticateJWT} = require('../middlewares/jwtAuth');

router.get('/', optionalAuthenticateJWT, getAllProblemStatements);
router.get('/filters', getFilterOptions);

router.get('/bookmarked', authenticateJWT, getBookmarkedProblemStatements);
router.get('/team', authenticateJWT, getTeamProblemStatements);
router.post('/bookmark', authenticateJWT, bookMarkPS);
router.delete('/bookmark', authenticateJWT, deleteBookMark);
router.post('/team', authenticateJWT, addPsToTeam);
router.delete('/team', authenticateJWT, deletePsFromTeam);
router.get('/:id', optionalAuthenticateJWT, getProblemStatementById);

module.exports = router;
