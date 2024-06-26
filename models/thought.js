const { Schema, model } = require('mongoose');
const Reaction = require('./reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get (function () {
        return this.reactions.length
    });

    const Thought = model('thought', thoughtSchema);

    module.exports = Thought;