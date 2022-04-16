const User = require('./../models/User');
const Token = require('./../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const {
    attachCookiesToResponse,
    sendVerificationEmail,
    createTokenUser
} = require('./../utils');
const crypto = require('crypto');

const register = async (req, res) => {

    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        throw new CustomError.BadRequestError('Please provide email, name and password');
    }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is admin
    const isFirstUser = await User.countDocuments({}) === 0;
    const role = isFirstUser ? "admin" : "user";

    const verificationToken = crypto.randomBytes(40).toString('hex');

    const user = await User.create({
        name, email, password, role, verificationToken
    })

    const origin = process.env.FRONT_END_ORIGIN;

    // send email
    // code.....send email
    sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    })

    // send verification token back only while testing in postman
    res.status(StatusCodes.CREATED).json({
        message: "Success, Please check your email to verify account"
    })
}

const verifyEmail = async (req, res) => {

    const { verificationToken, email } = req.body;

    if (!verificationToken || !email) {
        throw new CustomError.BadRequestError('Please provide verificationToken and email');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError.UnAuthenticatedError('Verification failed');
    }

    if (user.isVerified) {
        res.status(StatusCodes.OK).json({
            message: 'already verified',
        })
        return;
    }

    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnAuthenticatedError('Verification failed');
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verified = Date.now();

    await user.save();

    res.status(StatusCodes.OK).json({
        message: "email verified"
    })
}

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.UnAuthenticatedError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials, try with diffrent user');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnAuthenticatedError('Invalid Credentials');
    }

    if (!user.isVerified) {
        throw new CustomError.UnAuthenticatedError('Please verify your email');
    }

    // if everyting is good, create cookie and set it in response object
    const tokenUserObj = createTokenUser(user);

    // create refresh token
    let refreshToken = '';

    // check for existing token
    const existingToken = await Token.findOne({ user:user._id });

    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new CustomError.UnAuthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({ res, user:tokenUserObj, refreshToken });
        res.status(StatusCodes.OK).json({ user:tokenUserObj });
        return;
    }

    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const userToken = { refreshToken, ipAddress, userAgent, user:user._id };
    await Token.create(userToken);

    attachCookiesToResponse({ res, user:tokenUserObj, refreshToken });

    res.status(StatusCodes.OK).json({ user:tokenUserObj });
}

const logout = async (req, res) => {
    res.send('logout user');
}

const forgotPassword = async (req, res) => {
    res.send('forgot password');
}

const resetPassword = async (req, res) => {
    res.send('reset password')
}

module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword
}