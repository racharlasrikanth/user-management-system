const getAllUsers = async (req, res) => {
    res.send('get all users');
}

const getSingleUser = async (req, res) => {
    res.send('get single user');
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