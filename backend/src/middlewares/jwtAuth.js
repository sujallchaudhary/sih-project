const admin = require('firebase-admin');
const User = require('../models/user.model');

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
            mongoId: user._id
        };

        next();

    } catch (error) {
        console.error('Authentication Error:', error);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please sign in again.',
                code: 'TOKEN_EXPIRED'
            });
        }

        if (error.code === 'auth/invalid-id-token') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please sign in again.',
                code: 'INVALID_TOKEN'
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

module.exports = {
    authenticateFirebaseToken,
};