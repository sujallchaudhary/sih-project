const admin = require('firebase-admin');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// JWT authentication middleware (for regular API requests)
const authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authorization header with Bearer token required.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please sign in again.'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
            });
        }

        req.user = {
            uid: user.firebaseUid,
            email: user.email,
            name: user.name,
            mongoId: user._id,
            teamId: user.teamId
        };

        next();

    } catch (error) {
        console.error('JWT Authentication Error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please sign in again.',
                code: 'TOKEN_EXPIRED'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please sign in again.',
                code: 'INVALID_TOKEN'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

// Optional JWT authentication middleware
const optionalAuthenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // If no auth header, continue without user data
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user = null;
            return next();
        }

        const token = authHeader.split(' ')[1];

        // If no token, continue without user data
        if (!token) {
            req.user = null;
            return next();
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            if (user && user.isActive) {
                req.user = {
                    uid: user.firebaseUid,
                    email: user.email,
                    name: user.name,
                    mongoId: user._id,
                    teamId: user.teamId
                };
            } else {
                req.user = null;
            }
        } catch (authError) {
            // If token is invalid, continue without user data
            console.log('Optional JWT auth failed, continuing without user:', authError.message);
            req.user = null;
        }

        next();

    } catch (error) {
        console.error('Optional JWT Authentication Error:', error);
        // In case of any error, continue without user data
        req.user = null;
        next();
    }
};

// Firebase authentication middleware
const authenticateFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Authorization header with Bearer token required.'
            });
        }

        const idToken = authHeader.split(' ')[1];

        if (!idToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = await User.findOne({ firebaseUid: decodedToken.uid });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please sign up first.'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact support.'
            });
        }
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: user.name,
            mongoId: user._id,
            teamId: user.teamId
        };

        next();

    } catch (error) {
        console.error('Authentication Error:', error);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please refresh your session.',
                code: 'TOKEN_EXPIRED',
                shouldRefresh: true
            });
        }

        if (error.code === 'auth/invalid-id-token') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please sign in again.',
                code: 'INVALID_TOKEN',
                shouldRefresh: false
            });
        }

        if (error.code === 'auth/user-disabled') {
            return res.status(401).json({
                success: false,
                message: 'User account has been disabled.',
                code: 'USER_DISABLED'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

// Optional Firebase authentication middleware - allows both authenticated and non-authenticated users
const optionalAuthenticateFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // If no auth header, continue without user data
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user = null;
            return next();
        }

        const idToken = authHeader.split(' ')[1];

        // If no token, continue without user data
        if (!idToken) {
            req.user = null;
            return next();
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const user = await User.findOne({ firebaseUid: decodedToken.uid });

            if (user && user.isActive) {
                req.user = {
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                    name: user.name,
                    mongoId: user._id
                };
            } else {
                req.user = null;
            }
        } catch (authError) {
            // If token is invalid, continue without user data
            console.log('Optional auth failed, continuing without user:', authError.message);
            req.user = null;
        }

        next();

    } catch (error) {
        console.error('Optional Authentication Error:', error);
        // In case of any error, continue without user data
        req.user = null;
        next();
    }
};

module.exports = {
    authenticateFirebaseToken,
    optionalAuthenticateFirebaseToken,
    authenticateJWT,
    optionalAuthenticateJWT,
};