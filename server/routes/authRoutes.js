const express = require('express');
const { 
    register, 
    verifyEmail, 
    logout, 
    login, 
    resetPassword, 
    forgotPassword 
} = require('../controllers/authController');
const router = express.Router();

router.post('/', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router;