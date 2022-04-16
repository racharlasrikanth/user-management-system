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
    res.status(StatusCodes.OK).json({
        user: req.user
    })
}

const updateUser = async (req, res) => {

    const { email, name, image } = req.body;

    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({ _id:req.user.userId });
    user.email = email;
    user.name = name;
    if (image) user.image = image;
    await user.save();

    // after changing the user information please update cookie and json web token
    const tokenUserObj = createTokenUser(user);
    attachCookiesToResponse({ res, tokenUserObj });
    res.status(StatusCodes.OK).json({ usre:tokenUserObj });
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