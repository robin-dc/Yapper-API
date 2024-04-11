const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')


// @desc Get a single user profile
// @route GET /api/users/:userId
// @access private
const getUserProfile = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).select('-password')

        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get a single user friends list
// @route GET /api/users/:userId/friends
// @access private
const getFriends = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const userFriends = await User.findById(userId, {friends: 1})

        const friends = await Promise.all(
            userFriends.friends.map((id) => User.findById(id))
        )

        const essentialInfo = friends.map(({_id, firstName, lastName, location, avatar}) => {
            return {_id, firstName, lastName, location, avatar}
        })

        res.status(200).json(essentialInfo)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get a single user friend request list
// @route GET /api/users/:userId/requests
// @access private
const getFriendRequests = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const userFriendRequests = await User.findById(userId, {friendRequests: 1})

        const friendRequests = await Promise.all(
            userFriendRequests.friendRequests.map((id) => User.findById(id))
        )

        const essentialInfo = friendRequests.map(({_id, firstName, lastName, location, avatar}) => {
            return {_id, firstName, lastName, location, avatar}
        })

        res.status(200).json(essentialInfo)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Add a friend
// @route GET /api/users/:userId/add/:friendId
// @access private
const addRemoveFriendRequest = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const friendToBeAddedOrRemove = await User.findById(friendId)

        let message;
        if (friendToBeAddedOrRemove.friendRequests.includes(userId)) {
            await User.findByIdAndUpdate(
                friendId,
                { $pull: { friendRequests: userId } }
            );
            message = `Cancelled Request to ${friendToBeAddedOrRemove.firstName}`;
        } else {
            await User.findByIdAndUpdate(
                friendId,
                { $addToSet: { friendRequests: userId } }
            );
            message = `Added Request to ${friendToBeAddedOrRemove.firstName}`;
        }

        res.status(200).json({ message })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Unfriend a user
// @route GET /api/users/:userId/unfriend/:friendId
// @access private
const unfriend = asyncHandler(async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findById(userId);
        const friendToBeRemove = await User.findById(friendId);

        user.friends = user.friends.filter(id => id !== friendId);
        friendToBeRemove.friends = friendToBeRemove.friends.filter(id => id !== userId);

        await user.save();
        await friendToBeRemove.save();

        res.status(200).json({ message: `Unfriend ${friendToBeRemove.firstName} Successfully` });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

// @desc Confirm a friend request
// @route GET /api/users/:userId/confirm/:friendId
// @access private
const confirmRequest = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friendToBeConfirm = await User.findById(friendId)

        user.friends.push(friendId)
        friendToBeConfirm.friends.push(userId)
        user.friendRequests = user.friendRequests.filter(id => id !== friendId);

        await user.save()
        await friendToBeConfirm.save()

        res.status(200).json({message: `You're now friends with ${friendToBeConfirm.firstName}`})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getUserProfile,
    getFriends,
    getFriendRequests,
    addRemoveFriendRequest,
    confirmRequest,
    unfriend,
}
