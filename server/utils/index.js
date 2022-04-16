const { isTokenValid, createJWT, attachCookiesToResponse } = require('./jwt');
const sendVerificationEmail = require('./sendVerificationEmail');
const createTokenUser = require('./createTokenUser');

module.exports = {
    isTokenValid,
    createJWT,
    attachCookiesToResponse,
    sendVerificationEmail,
    createTokenUser
}