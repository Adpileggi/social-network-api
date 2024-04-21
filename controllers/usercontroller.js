const { Thought } = require('../models');
const { findOneAndUpdate } = require('../models/thought');
const User = require('../models/user');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user by ID and populate thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(400).json({ message: 'No user with that ID'})
            }
            
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST for a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update Single User
    async updateUser(req,res) {
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id'});
            }

            res.json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // delete user and assoicated thoughts
    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            
            if (!user) {
                return res.status(404).json({ message: 'No user with this id'});
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User and associated thoughts deleted" })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user =  await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: req.params.friendId} },
                { runValidators: true, new: true}
            )

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId} },
                { new: true }
            )

            res.json(user);
        } catch (err) {
            console.log('500 err')
            res.status(500).json(err);
        }
    }
};