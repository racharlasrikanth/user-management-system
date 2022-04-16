const User = require('./../models/User');
const Token = require('./../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const {
    attachCookiesToResponse
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


    // send verification token back only while testing in postman
    res.status(StatusCodes.CREATED).json({
        user,
        message: "Success, Please check your email to verify account"
    })
}

const verifyEmail = async (req, res) => {
    res.send('verify email');
}

const login = async (req, res) => {
    res.send('login user');
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