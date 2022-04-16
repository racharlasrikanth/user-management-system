const { isTokenValid, createJWT, attachCookiesToResponse } = require('./jwt');
const sendVerificationEmail = require('./sendVerificationEmail');

module.exports = {
    isTokenValid,
    createJWT,
    attachCookiesToResponse,
    sendVerificationEmail
}