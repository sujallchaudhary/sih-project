const express = require('express');
const router = express.Router();
const {googleSignIn, getCurrentUser, refreshToken} = require('../controllers/auth.controller');

const {authenticateFirebaseToken, authenticateJWT} = require('../middlewares/jwtAuth');

// Firebase auth for initial signin (converts Firebase token to JWT)
router.post('/signin', googleSignIn);

// JWT auth for protected routes (uses JWT token from signin)
router.get('/me', authenticateJWT, getCurrentUser);

// Optional JWT token refresh endpoint
router.post('/refresh', authenticateJWT, refreshToken);

module.exports = router;