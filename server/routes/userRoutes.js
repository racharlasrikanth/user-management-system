const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getSingleUser, 
    updateUser, 
    updateUserPassword, 
    showCurrentUser, 
    deleteUser
} = require('../controllers/userController');
const { authenticateUser, authorizePermissions } = require('./../middlewares/authentication');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'tester'), getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').delete(authenticateUser, deleteUser);

router.route('/:id').get(authenticateUser, getSingleUser);


module.exports = router;