const express = require('express');
const router = express.Router();
const {
    getAllProblemStatements,
    getProblemStatementById,
    getFilterOptions,
} = require('../controllers/ps.controller');

router.get('/', getAllProblemStatements);
router.get('/filters', getFilterOptions);
router.get('/:id', getProblemStatementById);

module.exports = router;
