const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser
} = require('../../controllers/usercontroller');

// api/
router.route('/').get(getUsers).post(createUser);

// api/:userId
router.route('/:userId').get(getSingleUser);

module.exports = router