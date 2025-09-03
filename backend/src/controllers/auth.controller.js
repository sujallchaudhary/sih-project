const admin = require('firebase-admin');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const serviceAccount = require('../../serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com/`
    });
}

const googleSignIn = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: 'Firebase ID token is required'
            });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture, email_verified } = decodedToken;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email not found in Firebase token'
            });
        }

        // Check if user already exists
        let user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'User with this email already exists with different authentication method'
                });
            }

            user = new User({
                firebaseUid: uid,
                name: name || email.split('@')[0],
                email: email,
                photoURL: picture || null,
                googleProfile: {
                    displayName: name,
                    givenName: decodedToken.given_name,
                    familyName: decodedToken.family_name,
                    locale: decodedToken.locale
                },
                lastLoginAt: new Date(),
                isActive: true
            });

            await user.save();
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user._id,
                        firebaseUid: user.firebaseUid,
                        name: user.name,
                        email: user.email,
                        photoURL: user.photoURL,
                        createdAt: user.createdAt
                    },
                    isNewUser: true,
                    token   
                }
            });
        } else {
            user.lastLoginAt = new Date();
            user.name = name || user.name;
            user.photoURL = picture || user.photoURL;
            user.isEmailVerified = email_verified || user.isEmailVerified;
            user.googleProfile = {
                displayName: name,
                givenName: decodedToken.given_name,
                familyName: decodedToken.family_name,
                locale: decodedToken.locale
            };

            await user.save();
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return res.status(200).json({
                success: true,
                message: 'User signed in successfully',
                data: {
                    user: {
                        id: user._id,
                        firebaseUid: user.firebaseUid,
                        name: user.name,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified,
                        lastLoginAt: user.lastLoginAt,
                        createdAt: user.createdAt
                    },
                    isNewUser: false,
                    token
                }
            });
        }

    } catch (error) {
        console.error('Google Sign-In Error:', error);
        
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({
                success: false,
                message: 'Firebase token has expired. Please sign in again.'
            });
        }

        if (error.code === 'auth/invalid-id-token') {
            return res.status(401).json({
                success: false,
                message: 'Invalid Firebase token'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Get full user details
        const fullUser = await User.findOne({ firebaseUid: user.uid }).select('-__v');
        const isInTeam = fullUser.teamId ? true : false;

        if (!fullUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: {
                user: {
                    id: fullUser._id,
                    firebaseUid: fullUser.firebaseUid,
                    name: fullUser.name,
                    email: fullUser.email,
                    photoURL: fullUser.photoURL,
                    isInTeam,
                    lastLoginAt: fullUser.lastLoginAt,
                    createdAt: fullUser.createdAt,
                }
            }
        });

    } catch (error) {
        console.error('Get Current User Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve user profile',
            error: error.message
        });
    }
};

// Refresh JWT token (optional endpoint for future use)
const refreshToken = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Generate new JWT token
        const newToken = jwt.sign({ userId: user.mongoId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                token: newToken
            }
        });

    } catch (error) {
        console.error('Token Refresh Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to refresh token',
            error: error.message
        });
    }
};

module.exports = {
    googleSignIn,
    getCurrentUser,
    refreshToken,
};