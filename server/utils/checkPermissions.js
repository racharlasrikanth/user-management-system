const CustomError = require('./../errors');

const checkPermissions = (requestedUser, resourceUserId) => {
    if (requestedUser.role === "admin") return;

    if (requestedUser.userId === resourceUserId.toString()) return;

    throw new CustomError.UnAuthorizedError(`Not authorized to access this route`);
}

module.exports = checkPermissions;