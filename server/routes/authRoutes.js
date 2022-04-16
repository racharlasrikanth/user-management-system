const express = require('express');
const router = express.Router();
const { 
    register, 
    verifyEmail, 
    logout, 
    login, 
    resetPassword, 
    forgotPassword 
} = require('../controllers/authController');
const { authenticateUser } = require('./../middlewares/authentication');

router.post('/', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router;