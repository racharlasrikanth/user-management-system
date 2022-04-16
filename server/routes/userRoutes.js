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

router.route('/').get(getAllUsers)
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);

router.route('/:id').delete(deleteUser);

router.route('/:id').get(getSingleUser);


module.exports = router;