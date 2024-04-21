const { Thought , User } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No user with that Id'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate (
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that Id'})
            }

            res.json('Thought created')
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            console.log('in the update')
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that Id'})
            }

            res.json(thought);
        } catch (err) {
            console.log('in the err')
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that Id'})
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that Id'})
            }

            res.json({ message: 'Thought deleted' });
        } catch(err) {
            res.status(500).json(err);
        }
    }
}