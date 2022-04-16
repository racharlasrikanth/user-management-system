const User = require('./../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const { createTokenUser, attachCookiesToResponse } = require('./../utils');
const checkPermissions = require('../utils/checkPermissions');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({
        count: users.length,
        users
    })
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }

    // check weather user having this route permission or not
    checkPermissions(req.user, user._id);

    // if all goes good (if requersted user having all permissons then proceed to send response)
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async (req, res) => {
    res.send('showing current user');
}

const updateUser = async (req, res) => {
    res.send('update user');
}

const updateUserPassword = async (req, res) => {
    res.send('update user password');
}

const deleteUser = async (req, res) => {
    res.send('delete required user');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser
}