const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    postImagePath: {
        type: String,
        default: ""
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)
