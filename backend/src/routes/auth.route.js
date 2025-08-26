const express = require('express');
const router = express.Router();
const {googleSignIn,getCurrentUser} = require('../controllers/auth.controller');

const {authenticateFirebaseToken} = require('../middlewares/jwtAuth');

router.post('/signin', googleSignIn);
router.get('/me', authenticateFirebaseToken, getCurrentUser);

module.exports = router;