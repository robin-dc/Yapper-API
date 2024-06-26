const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a name"],
        min: 2,
        max: 15
    },
    lastName: {
        type: String,
        required: [true, "Please enter a name"],
        min: 2,
        max: 15
    },
    email: {
        type: String,
        required: [true, "Please enter an email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        min: 5
    },
    avatar: {
        type: Object,
        default: {},
    },
    bio: {
        type: String,
        max: 50
    },
    friends: {
        type: Array,
        default: []
    },
    friendRequests: {
        type: Array,
        default: []
    },
    profileViews: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: [true, "Please enter a location"]
    },
    links: {
        type: Array,
        default: []
    }
},
{
    timestamps: true,
})


module.exports = mongoose.model('User', UserSchema)
