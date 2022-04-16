const User = require('./../models/User');
const Token = require('./../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const {
    attachCookiesToResponse
} = require('./../utils');

const register = async (req, res) => {
    res.send('register user');
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