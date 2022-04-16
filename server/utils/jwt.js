const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const isTokenValid = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: {user} });
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken }});

    // adding cookie to response
    const oneDay = 1000 * 60 * 60 * 24;
    const longerExp = oneDay * 30;

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production" ? true : false,
        signed: true,
    })

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + longerExp),
        secure: process.env.NODE_ENV === "production" ? true : false,
        signed: true,
    })
}

module.exports = {
    isTokenValid,
    attachCookiesToResponse,
    createJWT
}